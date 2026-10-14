import express from "express"
import postModel from "./models/post.model.js"
const app = express()
app.use(express.json())

app.get('/posts', async(req, res) => {
   const post= await postModel.find() //[{},{}] or []
//    const post= await postModel.findOne({title:"Post title"}) //{} or null
   res.status(200).json({message:"Posts fetched sucessfully", post})
})
app.post('/posts', async(req, res) => {
    const data= req.body
    await postModel.create({
        title: data.title,
        desc:data.desc
    })
    res.status(201).json({messgae:"Post created sucessfully"})
})

export default app