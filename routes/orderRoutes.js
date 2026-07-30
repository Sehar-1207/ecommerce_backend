import express from "express";
import { createOrder, getUserOrders, verifyStripePayment } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getUserOrders);
router.get("/verify-payment", protect, verifyStripePayment);

export default router;