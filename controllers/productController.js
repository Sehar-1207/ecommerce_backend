import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 0;
    const skip = parseInt(req.query.skip, 10) || 0;

    const total = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(limit);

    res.status(200).json({
      products,
      total,
      skip,
      limit: limit || total,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = !isNaN(Number(id)) ? { id: Number(id) } : { _id: id };

    const product = await Product.findOne(query);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const limit = parseInt(req.query.limit, 10) || 0;

    const filter = { category: { $regex: new RegExp(`^${category}$`, "i") } };

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter).limit(limit);

    res.status(200).json({
      products,
      total,
      skip: 0,
      limit: limit || total,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Invalid product data", error: error.message });
  }
};