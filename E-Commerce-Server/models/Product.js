import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description"],
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
    },
    stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
    },

    images: [
        {
            public_id: String,
            url: String
        }
    ],
    category: {
        // Reference to Category model ObjectId, One-to-Many relationship
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export const Product = mongoose.model("Product", schema);
