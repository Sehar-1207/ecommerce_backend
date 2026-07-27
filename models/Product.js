import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Please add a product title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: 0,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    stock: {
      type: Number,
      required: [true, "Please add stock quantity"],
      min: 0,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    warrantyInformation: {
      type: String,
    },
    shippingInformation: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;