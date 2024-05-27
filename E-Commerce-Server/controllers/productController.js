import {asyncErrorMiddleware} from "../middlewares/error.js";
import {Product} from "../models/Product.js";
import {v2 as cloudinary} from "cloudinary";
import ErrorHandler from "../utilities/errorHandler.js";
import {getDataUri} from "../utilities/getDataUri.js";

export const getAllProducts = asyncErrorMiddleware(async (req, res, next) => {
    // Search & Category query
    // Can filter by keywords and/or category
    const {keyword, category} = req.query;

    let filter = {};
    if (keyword) {
        filter.name = {
            $regex: keyword,
            $options: "i"
        }
    }
    if (category) {
        filter.category = category;
    }
    // Filter with regex and case insensitive
    const products = await Product.find(filter);


    res.status(200)
        .json({
            success: true,
            products
        })
});
export const getAllAdminProducts = asyncErrorMiddleware(async (req, res, next) => {

    // Search & Category query
    // Populate the product with reference to category.
    // In Database the product category is stored as ObjectId, we make a subquery to get the category details
    const products = await Product.find({}).populate("category");

    const outOfStock = products.filter(item => item.stock === 0);

    res.status(200)
        .json({
            success: true,
            products,
            outOfStock: outOfStock.length,
            inStock: products.length - outOfStock.length
        })
});


export const getProductById = asyncErrorMiddleware(async (req, res, next) => {
    const {id} = req.params;

    // Search & Category query
    const product = await Product.findById(id).populate("category");

    console.log(product)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200)
        .json({
            success: true,
            product
        })
});

export const createProduct = asyncErrorMiddleware(async (req, res, next) => {
    const {name, description, price, stock, category} = req.body;

    if (!req.file) {
        return next(new ErrorHandler("Please upload an image", 400));
    }

    const file = getDataUri(req.file);
    const myCloud = await cloudinary.uploader.upload(file.content);
    const image = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
    }

    await Product.create({
        name,
        description,
        price,
        stock,
        category,
        images: [image]
    });

    res.status(201)
        .json({
            success: true,
            message: "Product created successfully"
        })
});

export const updateProduct = asyncErrorMiddleware(async (req, res, next) => {
    const {id} = req.params;
    const {name, description, price, stock, category} = req.body;

    const product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    // if (name) product.name = name;
    // if (description) product.description = description;
    // if (price) product.price = price;
    // if (stock) product.stock = stock;
    // if (category) product.category = category;
    const fieldsToUpdate = ['name', 'description', 'price', 'stock', 'category'];
    fieldsToUpdate.forEach(field => {
        if (req.body[field]) {
            product[field] = req.body[field];
        }
    })

    await product.save();

    res.status(201)
        .json({
            success: true,
            message: "Product Updated Successfully"
        })
});

export const deleteProduct = asyncErrorMiddleware(async (req, res, next) => {
    const {id: paramId} = req.params;

    const product = await Product.findById(paramId);
    console.log(product)
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    // Delete all images from cloudinary related to the product
    for (let index in product.images) {
        await cloudinary.uploader.destroy(product.images[index].public_id);
    }

    await product.deleteOne({_id: product._id.toString()})

    res.status(200)
        .json({
            success: true,
            message: "Product Deleted Successfully"
        })
});

export const addProductImage = asyncErrorMiddleware(async (req, res, next) => {
    const {id} = req.params;

    const product = await Product.findById(id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    if (!req.file) {
        return next(new ErrorHandler("Please Add An Image", 400));
    }

    const file = getDataUri(req.file);
    const myCloud = await cloudinary.uploader.upload(file.content);
    const image = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
    }
    product.images.push(image);
    await product.save();

    res.status(200)
        .json({
            success: true,
            message: "Image Added Successfully"
        })
});

export const deleteProductImage = asyncErrorMiddleware(async (req, res, next) => {
    const {id: paramId} = req.params;

    const product = await Product.findById(paramId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const {id: queryId} = req.query;

    if (!queryId) {
        return next(new ErrorHandler("Please Add An Image Id", 400));
    }

    // Find the index of the image to delete and compare image id with query id
    let index = -1;
    product.images.forEach((item, _index) => {
        const {_id} = item;

        // _id is a Mongoose Object type, convert it to string
        if (_id.toString() === queryId) {
            index = _index;
        }
    })

    if (index === -1) {
        return next(new ErrorHandler("Image Not Found", 400));
    }

    await cloudinary.uploader.destroy(product.images[index].public_id);

    product.images.splice(index, 1);

    await product.save();

    res.status(200)
        .json({
            success: true,
            message: "Image Deleted Successfully"
        })
});

