import productModel from "../models/products.model.js";
import uploadFile from "../../services/storage.service.js";

export async function createProduct(req, res) {
    if (!req.file) {
        return res.status(400).json({
            message: "Image is required"
        });
    }

    const { name, desc } = req.body;

    try {
        const uploadImage = await uploadFile(req.file.buffer);

        const product = await productModel.create({
            image: uploadImage.url,
            name,
            desc,
            admin: req.user.id
        });

        return res.status(201).json({
            message: "Product added",
            product
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create product",
            error: error.message
        });
    }
}

export async function getProduct(req, res) {
    try {
        const products = await productModel.find().populate("admin", "username email");
        return res.status(200).json({
            message: "Products retrieved successfully",
            products
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to retrieve products",
            error: error.message
        });
    }
}
