import { ObjectId } from "mongodb";
import { Types, Schema, model } from "mongoose";

const orderModel = new Schema({
  userId: { type: Types.ObjectId, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  status: String,
  createdAt: { type: Date, default: Date.now, required: true },
  items: [
    {
      productId: Types.ObjectId,
      productName: String,
      productImage: String,
      quantity: Number,
      productPrice: Number,
      totalPrice: Number,
    },
  ],
  totalPrice: Number,
});

const Order = model("Order", orderModel);

export default Order;
