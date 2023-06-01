import { Types, Schema, model } from "mongoose";

const cartItemModel = new Schema({
    userId: {type: Types.ObjectId, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    quantitiy: {type: Number, required: true},
    productId: {type: Types.ObjectId, required: true},
    productName: {type: String, required: true},
    productImage: {type: String},
    productPrice: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    selectedOptions: [{
        name: String,
        value: String    
    }]
});

export default model("CartItem", cartItemModel);