import usersModel from "../models/users.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

async function registerUser(req, res) {
    try {
        const { username, email, password , role} = req.body;
        const userAlreadyExists = await usersModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })
        if (userAlreadyExists) {
            return res.status(409).json({ message: "User Already Exist" })
        }

       const hash = await bcrypt.hash(password, 10)

        const user = await usersModel.create({ username, email, password: hash, role })
        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, "491359b53d557a797597426fb512a328")

        res.cookie("token", token)

        res.status(201).json({ message: "User Created Sucessfully", user, token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error" })
    }
}

async function loginUser(req,res) {
     const { username, email , password } = req.body;
     const user = await usersModel.findOne({
        $or:[
            {username},
            {email}
        ]
     })

     if(!user){
        return res.status(404).json({
            message: "User not found"
        })
     }

     const isPasswordValid = await bcrypt.compare(password, user.password);
     if(!isPasswordValid){
        return res.status(401).json({message: "Invalid Password"})
     }

    const token = jwt.sign({
            id: user._id,
            role: user.role
        }, "491359b53d557a797597426fb512a328")

        res.cookie("token", token)
}

export { registerUser , loginUser }