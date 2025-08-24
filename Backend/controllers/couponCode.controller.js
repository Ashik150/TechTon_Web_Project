import { Shop } from '../models/shop.model.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
import { CouponCode } from '../models/couponCode.model.js';


export const createCouponCode = async (req, res, next) => {
    try {
        const isCouponCodeExists = await CouponCode.find({
            name: req.body.name,
        });

        const couponCode = await CouponCode.create(req.body);

         if (isCouponCodeExists.length !== 0) {
            return next(new ErrorHandler("Coupon code already exists!", 400));
        }

        res.status(201).json({
            success: true,
            couponCode,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
};

export const getCouponCodes = async (req, res, next) => {
    try {
        const couponCodes = await CouponCode.find({
            shopId: req.params.id,
        });

        res.status(201).json({
            success: true,
            couponCodes,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
};

export const deleteCouponCode = async (req, res, next) => {
    try {
        const couponCode = await CouponCode.findByIdAndDelete(req.params.id);

        res.status(201).json({
            success: true,
            message: "Coupon code deleted successfully!",
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
};

