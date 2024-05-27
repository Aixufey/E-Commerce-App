import express from 'express';
import {config} from "dotenv";
import user from "./routes/user.js";
import {errorMiddleware} from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary";
import product from "./routes/product.js";
import category from "./routes/category.js";
import order from "./routes/order.js";
import Stripe from "stripe";
import cors from "cors";

///////////////////////////////////
// Load environment variables
///////////////////////////////////
config({
    path: ".env"
})

///////////////////////////////////
// Cloudinary config for images
///////////////////////////////////
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

///////////////////////////////////
// Stripe config for payments
///////////////////////////////////
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

///////////////////////////////////
// Create express app
///////////////////////////////////
export const app = express();

///////////////////////////////////
// Middleware
///////////////////////////////////
// Body parser, cookie parser, cors
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: ["*"]
}));

///////////////////////////////////
// Routes endpoints
///////////////////////////////////
app.get("/", (req, res, next) => {
    res.send("Hello World");
})

app.use("/api/v1/user", user);
app.use("/api/v1/product", product);
app.use("/api/v1/category", category);
app.use("/api/v1/order", order);


///////////////////////////////////
// Error Middleware
///////////////////////////////////
app.use(errorMiddleware);
