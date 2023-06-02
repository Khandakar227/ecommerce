import { Schema, model } from "mongoose";

const productModel = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    vendor: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Number, required: true },
    sold: { type: Number, default: 0 },
    unit: { type: String, default: 'pcs' },
    published: { type: Boolean, default: false, required: true },
    discount: { type: Number },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    imageSrc: [{ type: String }],
    requireShipping: { type: Boolean, default: false },
    options: [
        {
            name: {
                type: String,
                required: true
            },
            value: {
                type: [String],
                required: true
            },
        }
    ],
    tags: [String],
});

export default model("Product", productModel);