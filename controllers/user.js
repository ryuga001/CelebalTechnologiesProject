import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { TryCatch } from "../middlewares/error.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
dotenv.config();
const SECRET = process.env.JWT_SECRET || ""

export const registerUser = TryCatch(async (req, res, next) => {
    const { username, email, password } = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
        username,
        email,
        password: hash,
    });
    if (!newUser) {
        return next(new ErrorHandler("Incorrect Details"));
    }
    return res.status(200).json({
        message: "User successfully registered",
        success: true,
    });
});
export const loginUser = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    if (!(bcrypt.compareSync(password, user.password))) {
        return next(new ErrorHandler("Invalid  Password", 401));
    }

    const token = jwt.sign({
        _id: user._id
    }, SECRET, {
        expiresIn: "2 day"
    });
    const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    return res.status(200).cookie("token", token, options).json({
        message: "user login successfully",
        success: true,
    });
});
export const logout = TryCatch(async (req, res, next) => {
    return res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        messsage: "user logged out",
    });
});


