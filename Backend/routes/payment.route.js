import express from "express";
const router = express.Router();
import {
  processpayment,
  stripekey,
} from "../controllers/payment.controller.js";


router.post("/process", processpayment);