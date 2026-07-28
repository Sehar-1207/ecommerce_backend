import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("orders", createOrder);
router.get("orders/:userId", getUserOrders);

export default router;