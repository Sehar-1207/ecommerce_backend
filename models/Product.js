import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
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
      default: 0,
    },
    brand: {
      type: String,
      trim: true,
      default: "Unbranded",
    },
    category: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
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
      default: "1 Year Standard Warranty",
    },
    shippingInformation: {
      type: String,
      default: "Ships in 3-5 business days",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;