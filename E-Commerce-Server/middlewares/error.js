// Error middleware to handle all errors if any otherwise send the default error message
export const errorMiddleware = (err, req, resp, next) => {
    console.info("Error Middleware Invoked");
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    // If duplicate key error from MongoDB
    if (err.code === 11000) {
        err.message = `Duplicate ${Object.keys(err.keyValue)} entered, please use another email.`;
        err.statusCode = 400;
    }

    // From Mongoose validation error, product Id not found
    if (err.name === "CastError") {
        err.message = `Product ${err.path} Not Found.`;
        err.statusCode = 400;
    }

    resp
        .status(err.statusCode)
        // To check type of error handling, remove .message from the response
        .json({success: false, message: err.message});
}


/**
 * Accepting an async callback function
 * Custom middleware to handle all async errors by passing callback function that is being sent from the controller.
 * @param asyncFn Callback async function
 * @returns {(function())|*}
 */
export const asyncErrorMiddleware = (asyncFn) => (req, res, next) => {
    Promise.resolve(asyncFn(req, res, next))
        // Catching any errors and passing them to the next middleware chain
        // The next will go to next handler chain, that is app.use(errorMiddleware) in App.js
        .catch(next);
}