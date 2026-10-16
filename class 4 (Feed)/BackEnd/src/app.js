import express from "express"
import postModel from "./models/post.model.js"
import  uploadFile  from "../services/storage.service.js"
import multer from 'multer'
const app = express()
app.use(express.json())

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
    res.status(201).json({messgae:"Post created sucessfully"})
})

export default app