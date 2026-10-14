 import express from "express"
import postModel from "./models/post.model.js"
const app = express()
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})
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
app.delete("/posts/:id",async(req, res)=>{
   const id= req.params.id
   await postModel.findOneAndDelete({_id:id})
    res.status(200).json({message:"Post deleted Successfully"})
})
app.patch("/posts/:id",async(req, res)=>{
    const id= req.params.id
    const desc = req.body.desc
    await postModel.findByIdAndUpdate({_id:id},{desc})
    res.status(200).json({message:"Post updated Successfully"})
})
export default app