import express from "express";
import {
  createProduct,
  getProducts,
  deleteProduct,
  getAllProduct,
  createNewReview,
  getBestSellingProducts,
} from "../controllers/product.controller.js";
const router = express.Router();
import { verifyToken } from "../middleware/verifyToken.js";
    