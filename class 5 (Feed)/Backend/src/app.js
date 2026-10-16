import express from "express"
import postModel from "./models/post.model.js"
import  uploadFile  from "../services/storage.service.js"
import multer from 'multer'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())

app.get('/posts', async(req, res) => {
   const post= await postModel.find() //[{},{}] or []
//    const post= await postModel.findOne({title:"Post title"}) //{} or null
   res.status(200).json({message:"Posts fetched sucessfully", post})
})
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post('/posts', upload.single('image') , async(req, res) => {
    const data= req.body
    const imgBuffer = req.file.buffer
    console.log(data,imgBuffer)

    const result = await uploadFile(imgBuffer)
    console.log(result.url)
   
      const post = await postModel.create({
      image: result.url,
      desc: data.desc
   })
   
    res.status(201).json({messgae:"Post created sucessfully"})
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
})

export default app