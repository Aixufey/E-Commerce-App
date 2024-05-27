import express from 'express';
import {isAuthenticated} from "../middlewares/auth.js";
import {isAdmin} from "../middlewares/admin.js";
import {
    createOrder,
    getAllAdminOrders,
    getMyOrders,
    getOrderById,
    updateOrder
} from "../controllers/orderController.js";
import {paymentHandler} from "../controllers/paymentController.js";

const order = express.Router();

order.get("/all", isAuthenticated, getMyOrders);
order.get("/admin", isAuthenticated, isAdmin, getAllAdminOrders);

order.post("/new", isAuthenticated, isAdmin, createOrder);

order.post("/payment", isAuthenticated, paymentHandler);

order.route("/order/:id")
    .get(isAuthenticated, getOrderById)
    .put(isAuthenticated, isAdmin, updateOrder);
export default order;