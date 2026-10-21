import usersModel from "../src/models/users.model.js";
import jwt from 'jsonwebtoken';

async function registerUser(req, res) {
    try {
        const { username,email,password } = req.body;
        const userAlreadyExists = await usersModel.findOne({email})
        if(userAlreadyExists){
            return res.status(409).json({message: "User Already Exist"})
        }
        const user = await usersModel.create({username,email,password})
        const token = jwt.sign ({
        id: user._id 
    }, "491359b53d557a797597426fb512a328")

    res.cookie("token" , token)

        res.status(201).json({message: "User Created Sucessfully",user , token})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server error" })
    }
}

export { registerUser }