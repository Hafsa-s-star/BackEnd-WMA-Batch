import express from "express"
import postModel from "./models/post.model.js"
const app = express()
app.use(express.json())
const post = [{ id: 1, title: "Umra", desc: "Hello world" },
     { id: 2, title: "Umra 1", desc: "Hello world 1" },
      { id: 3, title: "Umra 2", desc: "Hello world 2" }]
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/posts', async (req, res) => {
    try {
        const posts = await postModel.find();
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

app.post('/posts', async (req, res) => {
    try {
        const data = req.body;

        const newPost = await postModel.create({
            title: data.title,
            desc: data.desc
        });

        res.status(201).json({
            message: "Post created successfully",
            post: newPost
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});
app.delete("/posts/:id",(req, res)=>{
     const id = req.params.id
     
})
app.put("/posts/:id",(req, res)=>{
    
})
export default app