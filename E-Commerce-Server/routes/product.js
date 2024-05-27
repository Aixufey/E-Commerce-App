import express from 'express';
import {isAuthenticated} from "../middlewares/auth.js";
import {singleFileHandler} from "../middlewares/multer.js";
import {
    addProductImage,
    createProduct,
    deleteProduct,
    deleteProductImage, getAllAdminProducts,
    getAllProducts,
    getProductById,
    updateProduct
} from "../controllers/productController.js";
import {isAdmin} from "../middlewares/admin.js";

const product = express.Router();

product.get("/all", getAllProducts);

product.get("/admin", isAuthenticated, isAdmin, getAllAdminProducts);

// Using route to chain HTTP methods, get product details by id and/or update product details
product.route("/getById/:id")
    .get(getProductById)
    .put(isAuthenticated, isAdmin, updateProduct)
    .delete(isAuthenticated, isAdmin, deleteProduct);

product.post("/createProduct", isAuthenticated, isAdmin, singleFileHandler, createProduct);

product.route("/images/:id")
    .post(isAuthenticated, isAdmin, singleFileHandler, addProductImage)
    .delete(isAuthenticated, isAdmin, deleteProductImage);

export default product;