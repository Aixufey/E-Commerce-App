import {asyncErrorMiddleware} from "../middlewares/error.js";
import {v2 as cloudinary} from "cloudinary";
import ErrorHandler from "../utilities/errorHandler.js";
import {getDataUri} from "../utilities/getDataUri.js";
import {Category} from "../models/Category.js";
import {Product} from "../models/Product.js";

export const getAllCategories = asyncErrorMiddleware(async (req, res, next) => {
    const categories = await Category.find({});

    if (!categories) {
        return next(new ErrorHandler("Categories not found", 404));
    }

    return res.status(200)
        .json({
            success: true,
            categories
        })
});
export const getCategoryById = asyncErrorMiddleware(async (req, res, next) => {
    const {id} = req.params;
    const category = await Category.findById(id);

    if (!category) {
        return next(new ErrorHandler("Category Not Found", 404));
    }

    return res.status(200)
        .json({
            success: true,
            category
        })
});
export const createCategory = asyncErrorMiddleware(async (req, res, next) => {
    const {category} = req.body;

    if (!category) {
        return next(new ErrorHandler("Please Enter Category Name", 400));
    }

    await Category.create({
        category
    });

    return res.status(201)
        .json({
            success: true,
            message: "Category Created Successfully",
        })
});
export const deleteCategory = asyncErrorMiddleware(async (req, res, next) => {
    const {id} = req.params;

    const category = await Category.findById(id);

    if (!category) {
        return next(new ErrorHandler("Category Not Found", 404));
    }

    // Find and remove all products related to this categoryf
    const products = await Product.find({
        category: category._id
    })


    for (let index in products) {
        const product = products[index];
        console.log(product)
        product.category = null;
        await product.save();
    }

    await category.deleteOne({_id: category._id.toString()});

    res.status(200)
        .json({
            success: true,
            message: "Category Deleted Successfully"
        })
});
export const updateCategory = asyncErrorMiddleware(async (req, res, next) => {
    const {id} = req.params;
    const {category} = req.body;

    const categoryToUpdate = await Category.findById(id);

    if (!categoryToUpdate) {
        return next(new ErrorHandler("Category Not Found", 404));
    }

    if (category) {
        categoryToUpdate.category = category;
    }

    await categoryToUpdate.save();

    res.status(201)
        .json({
            success: true,
            message: "Category Updated Successfully"
        })
});