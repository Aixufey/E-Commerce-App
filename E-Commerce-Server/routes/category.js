import express from 'express';
import {isAuthenticated} from "../middlewares/auth.js";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
} from "../controllers/categoryController.js";
import {isAdmin} from "../middlewares/admin.js";

const category = express.Router();

category.get("/categories", getAllCategories);

category.post("/createCategory", isAuthenticated, isAdmin, createCategory);

category.route("/category/:id")
    .get(getCategoryById)
    .put(isAuthenticated, isAdmin, updateCategory)
    .delete(isAuthenticated, isAdmin, deleteCategory);

export default category;