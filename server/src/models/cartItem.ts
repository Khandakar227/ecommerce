import { ObjectId } from "mongodb";
import { Types, Schema, model } from "mongoose";

const cartItemModel = new Schema({
    userId: {type: Types.ObjectId, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    quantity: {type: Number, required: true},
    productId: {type: Types.ObjectId, required: true},
    productName: {type: String, required: true},
    productImage: {type: String},
    productPrice: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    colorId: ObjectId,
    sizeId: ObjectId,
});

const CartItem = model("CartItem", cartItemModel);

export default CartItem;