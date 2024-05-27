import {asyncErrorMiddleware} from "../middlewares/error.js";
import {stripe} from "../App.js";
import ErrorHandler from "../utilities/errorHandler.js";

/**
 * Frontend creates a payment intent with the total amount
 * @type {(function())|*}
 */
export const paymentHandler = asyncErrorMiddleware(async (req, res, next) => {
    const {total} = req.body;

    if (!total) {
        return next(new ErrorHandler("Please provide a total amount", 400));
    }

    // The total are in lowest currency unit, i.e. $10.00 is 1000
    const {client_secret  } = await stripe.paymentIntents.create({
        amount: Number(total),
        currency: "usd",
    })

    // Send the client secret back to the frontend to complete the payment
    res.status(200)
        .json({
            success: true,
            message: "Payment successful",
            client_secret
        })
});