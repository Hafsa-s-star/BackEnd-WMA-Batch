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
   }
})
const usersModel = mongoose.model("users",usersSchema)
export default usersModel
