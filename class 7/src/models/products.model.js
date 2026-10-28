import mongoose from "mongoose"

const productsSchema= new mongoose.Schema({
   image: {
   type: String,
   require: true
   },

   username : {
   type: String,
   require: true
   },

   email: {
    type: String,
    unique: true,
    require: true
   },
   
   password: {
    type: String,
    require:true
   },

   admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
   }  
})
const productsModel = mongoose.model("products",productsSchema)
export default productsModel
