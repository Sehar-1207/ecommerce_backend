import { stripe } from "../config/stripe.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { shippingForm, items, total, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderId = `ORD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const newOrder = await Order.create({
      id: orderId,
      userId,
      shippingForm,
      items,
      total,
      paymentMethod,
      status: "Processing",
      paymentStatus: paymentMethod === "stripe" ? "Pending" : "N/A",
    });

    if (paymentMethod !== "stripe") {
      await Cart.findOneAndUpdate({ userId }, { items: [] });
      return res.status(201).json(newOrder);
    }
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      metadata: {
        orderId: newOrder.id,
        userId,
      },
      success_url: `${process.env.CLIENT_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/order-cancelled?orderId=${newOrder.id}`,
    });

    newOrder.stripeSessionId = session.id;
    await newOrder.save();
    res.status(201).json({ order: newOrder, checkoutUrl: session.url });
  } catch (error) {
    res.status(400).json({ message: "Failed to create order", error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const verifyStripePayment = async (req, res) => {
  try {
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    const order = await Order.findOneAndUpdate(
      { id: session.metadata.orderId },
      { paymentStatus: "Paid" },
      { new: true }
    );

    await Cart.findOneAndUpdate({ userId: session.metadata.userId }, { items: [] });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Verification failed", error: error.message });
  }
};