import { Schema, model } from "mongoose";


const ProductSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    }

}, {
    timestamps: true,
})

const Product = model("product", ProductSchema);

export default Product;