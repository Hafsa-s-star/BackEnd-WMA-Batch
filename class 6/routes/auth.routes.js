import express from "express"
import {registerUser} from "../controller/auth.controller.js"
const router = express.Router()

// /api/auth/register

router.post("/register", registerUser);
router.get("/test" , (req,res) => {
    console.log("Cookies" , req.cookies)
    res.json({message: "Cookie recieved",
        cookies: req.cookies
    })
})

export default router;