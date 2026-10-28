 import express from "express";
import {createProduct } from "../controller/product.controller.js";
const router = express.Router();
import { authenticateToken  } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js"
// /api/auth/register
router.post("/create", authenticateToken,upload.single("image") ,createProduct);

export default router;