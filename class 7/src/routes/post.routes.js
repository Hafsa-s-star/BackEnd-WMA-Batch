import express from "express";

const router = express.Router();

router.post("/create" , async(req,res) => {
   const token = req.cookies.token;

   if(!token) {
    return res.status(401).json({ message: "Unauthorized"});
   }try {
    const decoded = jwt.verify(token , "491359b53d557a797597426fb512a328")
    const user = await usersModel.findOne({ _id: decoded.id });
    console.log(user);
   } catch (error) {
    return res.status(401).json({ message: "invalid token"});
   }
    res.send("post created");
})

export default router;