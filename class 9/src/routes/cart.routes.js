import express from "express";
import {addToCart,getCart} from "../controller/cart.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/items", authenticateToken, addToCart);
router.get("/", authenticateToken, getCart);

export default router;