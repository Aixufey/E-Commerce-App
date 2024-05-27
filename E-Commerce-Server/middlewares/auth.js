import ErrorHandler from "../utilities/errorHandler.js";
import {User} from "../models/User.js";
import jwt from "jsonwebtoken";
import {asyncErrorMiddleware} from "./error.js";


export const isAuthenticated = asyncErrorMiddleware(async (req, res, next) => {

    // Extract token from cookies in request
    const { token } = req.cookies;

    // If token is not present, next handle error.
    if (!token) {
        return next(new ErrorHandler("Unathorized Access", 401));
    }

    // Find user by token and verify it.
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodeData._id);

    // Next handle "getMe" is called.
    next();
})