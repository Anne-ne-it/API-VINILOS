import express from "express";
import { authMiddleware } from "../middlewares/authenticate.js"
import { getCartController, getCartByIDController, addItemController, checkoutController } from "../controllers/cart.controller.js";

const router = express.Router()

router.get("/", authMiddleware, getCartController)
router.get("/:cartId", authMiddleware, getCartByIDController)
router.post("/items", authMiddleware, addItemController)
router.post("/checkout", authMiddleware, checkoutController)

export default router