import express from "express"
import postModel from "./models/post.model.js"
import uploadFile from "../services/storage.service.js"
import multer from 'multer'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.get('/posts', async (req, res) => {
    try {
        const post = await postModel.find()
        res.status(200).json({ message: "Posts fetched sucessfully", post })
    } catch (err) {
        res.status(500).json({ message: "Error fetching posts", error: err.message })
    }
})

app.post('/posts', upload.single('image'), async (req, res) => {
    try {
        const data = req.body
        let imageUrl = ""
        if (req.file) {
            const imgBuffer = req.file.buffer
            const result = await uploadFile(imgBuffer)
            imageUrl = result.url
        }

        const post = await postModel.create({
            image: imageUrl,
            desc: data.desc
        })

        res.status(201).json({ message: "Post created sucessfully", post })
    } catch (err) {
        res.status(500).json({ message: "Error creating post", error: err.message })
    }
})

app.patch("/posts/:id", upload.single('image'), async (req, res) => {
    try {
        const id = req.params.id
        const updateData = {}
        if (req.body.desc) {
            updateData.desc = req.body.desc
        }
        if (req.file) {
            const result = await uploadFile(req.file.buffer)
            updateData.image = result.url
        }
        const updatedPost = await postModel.findByIdAndUpdate(id, updateData, { new: true })
        res.status(200).json({ message: "Post updated Successfully", post: updatedPost })
    } catch (err) {
        res.status(500).json({ message: "Error updating post", error: err.message })
    }
})

app.delete("/posts/:id", async (req, res) => {
    try {
        const id = req.params.id
        await postModel.findByIdAndDelete(id)
        res.status(200).json({ message: "Post deleted Successfully" })
    } catch (err) {
        res.status(500).json({ message: "Error deleting post", error: err.message })
    }
})

export default app