import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true },
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
    },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true, min: 0 },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    stock: { type: Number, required: true, default: 0 },
    tags: [{ type: String }],
    brand: { type: String, default: 'Generic' },
    sku: { type: String },
    weight: { type: Number },
    dimensions: {
      width: Number,
      height: Number,
      depth: Number,
    },
    warrantyInformation: { type: String },
    shippingInformation: { type: String },
    availabilityStatus: { type: String, default: 'In Stock' },
    reviews: [reviewSchema],
    returnPolicy: { type: String },
    minimumOrderQuantity: { type: Number, default: 1 },
    images: [{ type: String }],
    thumbnail: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

productSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;