import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, { timestamps: true });

const productsModel = mongoose.model("products", productsSchema);
export default productsModel;
