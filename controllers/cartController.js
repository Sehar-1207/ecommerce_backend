import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    let cart = await Cart.findOne({ userId }).lean();

    if (!cart) {
      cart = { userId, items: [] };
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { items } = req.body;

    let cart = await Cart.findOneAndUpdate(
      { userId },
      { items },
      { new: true, upsert: true }
    ).lean();

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: "Failed to update cart", error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.findOneAndUpdate({ userId }, { items: [] });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};