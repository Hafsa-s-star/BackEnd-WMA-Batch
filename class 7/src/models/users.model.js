import mongoose from "mongoose"

const usersSchema= new mongoose.Schema({
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

   role:{
      type: String,
      default: "user",
      enum:["user","admin"]
   }
})
const usersModel = mongoose.model("users",usersSchema)
export default usersModel
