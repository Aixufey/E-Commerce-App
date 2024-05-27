import express from 'express';
import {
    changePassword,
    forgotPassword,
    getMe,
    login,
    logout,
    resetPassword,
    signup,
    updatePicture,
    updateProfile
} from "../controllers/userController.js";
import {isAuthenticated} from "../middlewares/auth.js";
import {singleFileHandler} from "../middlewares/multer.js";

const user = express.Router();

/*
user.get("/me", (req, res, next) => {
    next();
});
*/

// user.route("/login").get(login);

user.post("/login", login);

user.post("/signup", singleFileHandler, signup);

// Only authenticated users can access this route. Here we have two middlewares(handlers), i.e. cookie must be present.
user.get("/me", isAuthenticated, getMe);

user.get("/logout", isAuthenticated, logout);

// Updating user details
user.put("/updateprofile", isAuthenticated, updateProfile);
user.put("/changepassword", isAuthenticated, changePassword);
user.put("/updatepicture", isAuthenticated, singleFileHandler, updatePicture);

// Change password & Reset password. Using the same route one as POST and the other as PUT.
user.route("/forgotpassword")
    .post(forgotPassword)
    .put(resetPassword);
export default user;
