import cloudinary from 'cloudinary';
import { Shop } from '../models/shop.model.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
import { Event } from '../models/event.model.js';

export const createEvent = async (req, res, next) => {
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return next(new ErrorHandler('Shop not found', 400));
        } 
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
};