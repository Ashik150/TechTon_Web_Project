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
        } else {
            let images = [];

            if (typeof req.body.images === "string") {
                images.push(req.body.images);
            } else {
                images = req.body.images;
            }

            const imagesLinks = [];


            const productData = req.body;
            productData.images = imagesLinks;
            productData.shop = shop;

            const event = await Event.create(productData);

            res.status(201).json({
                success: true,
                event,
            });
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
};