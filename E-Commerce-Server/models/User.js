import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "Email already exists"],
        validate: validator.isEmail,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false, // Exclude from query results
    },
    address: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    postCode: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    avatar: {
        public_id: String,
        url: String
    },
    otp: Number,
    otp_Expire: Date
});

// Hash password before saving
schema.pre("save", async function (next) {
    try {
        // console.log(this.isModified("password"))
        // We don't want to hash an already hashed password
        if (!this.isModified("password")) {
            return next();
        }

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        console.info(this)
    } catch (e) {
        console.error(e);
    }
})

// Create a named method to compare password in controller for validation
schema.methods.comparePassword = async function (inputPassword) {
    try {
        return await bcrypt.compare(inputPassword, this.password);
    } catch (e) {
        console.error(e);
    }
}

// Generate JWT by accessing _id from schema, and using the secret key from .env file
schema.methods.generateJWT = function () {
    // console.info(this)
    return jwt.sign(
        {_id: this._id},
        process.env.JWT_SECRET,
        {expiresIn: "15d"}
    );
}

export const User = mongoose.model("User", schema);
