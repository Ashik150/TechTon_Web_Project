import express from 'express';
import {createOrder,getAllOrdersOfUser,getAllOrdersOfSeller,updateOrderStatus,requestOrderRefund,acceptOrderRefund, getDeliveredOrders, getProductCategoryDistribution, getUserPoints} from '../controllers/order.controller.js';
const router = express.Router();
import { isSeller} from '../middleware/auth.middleware.js';

