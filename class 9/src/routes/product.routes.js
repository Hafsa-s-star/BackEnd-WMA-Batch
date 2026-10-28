 import express from "express";
import {createProduct,getProduct } from "../controller/product.controller.js";
const router = express.Router();
import { authenticateToken,authenticateAdmin  } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js"
// /api/auth/register
router.post("/create", authenticateToken,authenticateAdmin,upload.single("image") ,createProduct);
router.get("/", getProduct);

export default router;