import mongoose from 'mongoose';


const schema = new mongoose.Schema({
    // Shipping Information
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        postCode: {
            type: String,
            required: true,
        },
    },

    // Ordered Items
    // Array of product object, reference to Product ID
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            }
        }
    ],

    // User who placed the order
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Payment Information
    paymentMethod: {
        type: String,
        enum: ["INVOICE", "CARD"],
        default: "INVOICE"
    },

    paidAt: {
        type: Date
    },

    paymentInfo: {
        id: String,
        status: String,
    },

    itemsPrice: {
        type: Number,
        required: true
    },
    taxPrice: {
        type: Number,
        required: true
    },
    shippingFee: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },

    // Order Status
    orderStatus: {
        type: String,
        enum: ["Preparing", "Shipped", "Delivered"],
        default: "Preparing"
    },

    deliveredAt: {
        type: Date
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

});

export const Order = mongoose.model("Order", schema);
