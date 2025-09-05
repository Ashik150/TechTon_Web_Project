import { User } from "../models/user.model.js";
import { Shop } from "../models/shop.model.js";
import { ErrorHandler } from '../Utils/ErrorHandler.js';
import jwt from "jsonwebtoken";

export const isAuthenticated = async(req,res,next) => {
    const {token} = req.cookies.token;

     if(!token){
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
};