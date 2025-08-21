import ErrorHandler from "../Utils/ErrorHandler.js";
import { Order } from "../models/order.model.js";
import { Shop } from "../models/shop.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";


export const createOrder=async(req,res)=>{
    try {
        const { cart, shippingAddress, user, totalPrice, paymentInfo } =req.body;
        const shopItemsMap = new Map();
        
        
    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    }

     const orders = [];

       for (const [shopId, items] of shopItemsMap) {
         const order = await Order.create({
           cart: items,
           shippingAddress,
           user,
           totalPrice,
           paymentInfo,
         });
         orders.push(order);
       }
       res.staus(201).json({
        success:true,
        orders,
       });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}

export const getAllOrdersOfUser = async (req, res, next) => {
  try {
    const orders = await Order.find({ "user._id": req.params.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};


export const getAllOrdersOfSeller = async (req, res, next) => {
  try {
    const orders = await Order.find({
      "cart.shopId": req.params.shopId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};