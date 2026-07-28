import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, shippingForm, items, total, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderId = `ORD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const newOrder = await Order.create({
      id: orderId,
      userId: userId || "guest",
      shippingForm,
      items,
      total,
      paymentMethod,
      status: "Processing"
    });

    if (userId && userId !== "guest") {
      await Cart.findOneAndUpdate({ userId }, { items: [] });
    }

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: "Failed to create order", error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};