import Address from "../models/Address.js";

export const getAddresses = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const addresses = await Address.find({ userId }).sort({ createdAt: -1 }).lean();
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const createAddress = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { type, name, street, city } = req.body;

    if (!name || !street || !city) {
      return res.status(400).json({ message: "Missing address details" });
    }

    const address = await Address.create({ userId, type, name, street, city });
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ message: "Failed to create address", error: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { id } = req.params;
    const { type, name, street, city } = req.body;

    const address = await Address.findOneAndUpdate(
      { _id: id, userId },
      { type, name, street, city },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json(address);
  } catch (error) {
    res.status(400).json({ message: "Failed to update address", error: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { id } = req.params;

    const address = await Address.findOneAndDelete({ _id: id, userId });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};