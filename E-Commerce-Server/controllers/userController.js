import {User} from "../models/User.js";
import ErrorHandler from "../utilities/errorHandler.js";
import {asyncErrorMiddleware} from "../middlewares/error.js";
import {cookieOptions, tokenHandler} from "../utilities/tokenHandler.js";
import {getDataUri} from "../utilities/getDataUri.js";
import {v2 as cloudinary} from "cloudinary";
import {sendOTP} from "../utilities/sendOTP.js";

// This login fn will be referenced in route "login/" and using custom error handler to handle errors.
// Essentially the whole async block function is wrapped in a promise and catch block to handle errors.
export const login = asyncErrorMiddleware(async (req, res, next) => {
    const {email, password} = req.body;

    if (!password) return next(new ErrorHandler("Please Enter Password", 400));
    if (!email) return next(new ErrorHandler("Please Enter Email", 400));

    // Find user and select password from schema
    const user = await User.findOne({
        email
    }).select("+password")

    // Call next middleware if email/password is incorrect, and pass in custom error using utility class.
    // Next is throwing an error handler.
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    // Named method from Schema
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return next(new ErrorHandler("Incorrect Email or Password", 400));
    }

    // Send token to user
    tokenHandler(user, res, `Login successful, ${user.name}`, 200);
})

export const signup = asyncErrorMiddleware(async (req, res, next) => {
    const {name, email, password, address, country, city, postCode} = req.body;

    let user = await User.findOne({email});

    if (user) {
        return next(new ErrorHandler("User Already Exists", 400));
    }

    let avatar;
    if (req.file) {
        const file = getDataUri(req.file);
        const myCloud = await cloudinary.uploader.upload(file.content);
        avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }

    user = await User.create({
        avatar,
        name,
        email,
        password,
        address,
        country,
        city,
        postCode,
    });

    tokenHandler(user, res, `Signup successful, ${user.name}`, 201);
})

export const getMe = asyncErrorMiddleware(async (req, res, next) => {

    // If user is authenticated, user object is assigned to req.user from isAuthenticated middleware.
    const {_id} = req.user;

    const user = await User.findById(_id);

    res.status(200)
        .json({
            success: true,
            user
        })
})

export const logout = asyncErrorMiddleware(async (req, res, next) => {
    // Clear cookie
    res.status(200)
        .cookie("token", "", {
            ...cookieOptions,
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Successfully Logged Out"
        })
})

export const updateProfile = asyncErrorMiddleware(async (req, res, next) => {
    const {_id} = req.user;
    const {name, email, address, city, country, postCode} = req.body;
    
    const user = await User.findById(_id);

    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    if (city) user.city = city;
    if (country) user.country = country;
    if (postCode) user.postCode = postCode;

    await user.save();

    res.status(200)
        .json({
            success: true,
            message: "Profile Updated",
            user
        })
});

export const changePassword = asyncErrorMiddleware(async (req, res, next) => {
    const {_id} = req.user;
    const {oldPassword, newPassword} = req.body;

    if (!oldPassword || !newPassword) {
        return next(new ErrorHandler("Please Enter Old Password & New Password", 400));
    }

    // Find user and select password from schema
    const user = await User.findById(_id).select("+password");

    // Check if old password matches
    const isMatched = await user.comparePassword(oldPassword);

    if (!isMatched) {
        return next(new ErrorHandler("Incorrect Old Password", 400));
    }

    // Assign new password and save
    user.password = newPassword;
    await user.save();

    res.status(200)
        .json({
            success: true,
            message: "Password Changed Successfully",
        })
});

export const forgotPassword = asyncErrorMiddleware(async (req, res, next) => {
    const {email} = req.body;
    const user = await User.findOne({email});

    if (!user) return next(new ErrorHandler("Incorrect Email", 404));

    // Generate OTP of 6 digits and set 10 min expiry
    const otp = Math.floor(Math.random() * (899_999 - 100_000));
    const otp_Expire = 10 * 60 * 1000;
    // console.log(otp)

    user.otp = otp;
    user.otp_Expire = new Date(Date.now() + otp_Expire);

    await user.save();

    // Send OTP to user
    const message = `Your OTP is ${otp}. It will expire in ${user.otp_Expire.getMinutes() - new Date().getMinutes()} minutes.\nPlease ignore this if you didn't request this.`;
    try {
        await sendOTP("OTP for password reset", user.email, message)
    } catch (e) {
        user.otp = null;
        user.otp_Expire = null;
        await user.save();

        return next(new ErrorHandler(`OTP could not be sent!\n ${e}`, 500));
    }

    res.status(200)
        .json({
            success: true,
            message: `A verification code has been sent to ${email}`
        });

});
export const resetPassword = asyncErrorMiddleware(async (req, res, next) => {
    const {otp, newPassword} = req.body;

    // Find user with this otp and expiry must be greater than current time
    // Example: now 10:00, expiry 10:10
    // Condition: Expire > 10:00 then valid
    const user = await User.findOne({
        otp,
        otp_Expire: {
            $gt: Date.now()
        }
    })

    if (!user) {
        return next(new ErrorHandler("OTP is invalid or has expired", 400));
    }

    if (!newPassword) {
        return next(new ErrorHandler("Please Enter A New Password", 400));
    }

    user.password = newPassword;
    user.otp = null;
    user.otp_Expire = null;

    await user.save();

    res.status(200)
        .json({
            success: true,
            message: "Password Updated Successfully"
        })

});

export const updatePicture = asyncErrorMiddleware(async (req, res, next) => {
    const {_id} = req.user;
    const user = await User.findById(_id);

    if (!req.file) {
        return next(new ErrorHandler("Please Upload a File", 400));
    }

    const file = getDataUri(req.file);

    await cloudinary.uploader.destroy(user.avatar.public_id);

    const myCloud = await cloudinary.uploader.upload(file.content);
    user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
    };

    await user.save();

    res.status(200)
        .json({
            success: true,
            message: "Profile Picture Updated",
            user
        })
})