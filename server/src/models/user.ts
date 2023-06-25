import { Schema, model } from "mongoose";

const userModel = new Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    authType: { type: String, required: true },
    role: { type: String, required: true },
    displayPhoto: { type: String },
    address: {
        apartment: { type: String },
        area: { type: String },
        city: { type: String },
        country: { type: String },
    },
    verified: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now, required: true },
    signedInAt: { type: Date, default: Date.now }
});

export default model("User", userModel);