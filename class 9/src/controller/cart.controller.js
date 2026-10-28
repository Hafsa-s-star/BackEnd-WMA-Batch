import mongoose from "mongoose";
import productModel from "../models/products.model.js";
import userModel from "../models/users.model.js";

async function addToCart(req, res) {
    try {
        const body = req.body;
        if (!body || typeof body !== "object" || Array.isArray(body)) {
            return res.status(400).json({
                message: "Request body must be a JSON object"
            });
        }

        const { productId } = body;
        const quantity = Number(body.quantity) || 1;

        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }
        if (quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const cartItem = user.cart.find(item => item.product.toString() === productId);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity});
        }

        await user.save();

        const updatedUser = await userModel.findById(user._id).select("cart").populate("cart.product","name desc image")

        return res.status(200).json({
            message: "Product added to cart",
            cart: updatedUser.cart,updatedUser
        });
    } catch (error) {
        return res.status(400).json({
            message: "Failed to add product to cart",
            error: error.message
        });
    }
}

async function getCart(req, res) {
    try {
        const user = await userModel.findById(req.user.id).select("cart").populate("cart.product","name desc image");
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            cart: user.cart
        });
    } catch (error) {
        return res.status(400).json({
            message: "Failed to retrieve cart",
            error: error.message
        });
    }
}

export {addToCart,getCart};