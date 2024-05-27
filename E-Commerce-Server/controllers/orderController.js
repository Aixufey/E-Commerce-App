import {Order} from "../models/Order.js";
import {asyncErrorMiddleware} from "../middlewares/error.js";
import {Product} from "../models/Product.js";
import ErrorHandler from "../utilities/errorHandler.js";


/**
 * Get all orders for the logged in user
 */
export const getMyOrders = asyncErrorMiddleware(async (req, res, next) => {
    const {_id} = req.user;
    const orders = await Order.find({user: _id});

    if (!orders) {
        return next(new ErrorHandler("No Orders Found", 404));
    }

    res.status(200)
        .json({
            success: true,
            orders
        })
});

/**
 * Get all orders from all users as an admin
 */
export const getAllAdminOrders = asyncErrorMiddleware(async (req, res, next) => {
    const orders = await Order.find({});

    if (!orders) {
        return next(new ErrorHandler("No Orders Found", 404));
    }

    res.status(200)
        .json({
            success: true,
            orders
        })
});

export const getOrderById = asyncErrorMiddleware(async (req, res, next) => {
    const {id} = req.params;
    const order = await Order.findById(id);

    if (!order) {
        return next(new ErrorHandler(`Order Not Found With Id: ${id}`, 404));
    }

    res.status(200)
        .json({
            success: true,
            order
        })
});

export const createOrder = asyncErrorMiddleware(async (req, res, next) => {
    const {_id} = req.user;
    const {
        shippingInfo,
        orderItems,
        paymentMethod,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingFee,
        totalPrice,
    } = req.body;

    // Reduce stock of products
    // Find each product in orderItems and get their product id
    // Find the product in the database and reduce the stock
    for (let index in orderItems) {
        const item = orderItems[index];

        const product = await Product.findById(item.product);

        if (product.stock === 0) {
            return next(new ErrorHandler("Product is out of stock", 400));
        }
        if (product.stock < item.quantity) {
            return next(new ErrorHandler(`Ordered quantity exceeds available stock`, 400));
        }
        product.stock -= item.quantity;

        await product.save();
    }

    await Order.create({
        user: _id,
        shippingInfo,
        orderItems,
        paymentMethod,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingFee,
        totalPrice,
    })

    res.status(201)
        .json({
            success: true,
            message: "Order Placed Successfully"
        })
});

export const updateOrder = asyncErrorMiddleware(async (req, res, next) => {
    const {id} = req.params;

    const order = await Order.findById(id);

    if (!order) {
        return next(new ErrorHandler(`Order Not Found With Id: ${id}`, 404));
    }

    switch (order.orderStatus) {
        case "Preparing": {
            order.orderStatus = "Shipped";
            break;
        }
        case "Shipped": {
            order.orderStatus = "Delivered";
            order.deliveredAt = Date.now();
            break;
        }
        case "Delivered": {
            return next(new ErrorHandler("Order has already been delivered", 400));
        }
    }
    await order.save();

    res.status(200)
        .json({
            success: true,
            message: "Order Status Updated"
        })
});
