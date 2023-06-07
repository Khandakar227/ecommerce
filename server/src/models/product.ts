import { Schema, model } from "mongoose";

const productModel = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  vendor: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Number, required: true, default: 0 },
  sold: { type: Number, default: 0 },
  unit: { type: String, default: "pcs" },
  published: { type: Boolean, default: false, required: true },
  discount: { type: Number },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  imageSrc: [{ type: String }],
  requireShipping: { type: Boolean, default: false },
  colors: [{name: String, priceDiff: {type: Number, default: 0}, quantity: {type: Number, default: 0}}],
  sizes: [{name: String, priceDiff: {type: Number, default: 0}, quantity: {type: Number, default: 0}}],
  tags: [String],
});

const Product = model("Product", productModel);

Product.collection
  .createIndex({ title: "text", vendor: "text", tags: "text" })
  .then(() => console.log("Text index created on Products"))
  .catch((err) => console.log(err));

export default Product;
