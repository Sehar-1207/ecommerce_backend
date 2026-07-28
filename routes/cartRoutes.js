import express from "express";
import { getCart, updateCart, clearCart } from "../controllers/cartController.js";
import { createOrder, getUserOrders } from "../controllers/orderController.js";

const router = express.Router();

router.get("/:userId", getCart);
router.post("/:userId", updateCart);
router.delete("/:userId", clearCart);

export default router;