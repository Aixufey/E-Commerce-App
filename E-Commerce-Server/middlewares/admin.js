import {asyncErrorMiddleware} from "./error.js";
import ErrorHandler from "../utilities/errorHandler.js";

export const isAdmin = asyncErrorMiddleware(async (req, res, next) => {
    const {user} = req;

    if (user.role !== "admin") {
        return next(new ErrorHandler("Unauthorized Access - Invalid Credentials.", 401));
    }

    // Proceed to next middleware if user is admin
    next();
})