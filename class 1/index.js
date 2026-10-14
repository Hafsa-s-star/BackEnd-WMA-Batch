import express from "express"
const app = express()
 const port = 4000

app.use(express.json())
const user = [{id:1, name:"Umra", email:"umra@gmail.com"}
    ,{id:2,name:"Sana", email:"sana@gmail.com"},
    {id:3, name:"Umra", email:"umra@gmail.com"}]
app.get("/",(req, res)=>{
    res.send("Umra Badar")
})
app.get("/user",(req, res)=>{
    res.send(user)
})
app.post("/user",(req, res)=>{
    user.push({id: user.length+1, ...req.body})
    res.send({message:"User Added Successfully"})
})
app.delete("/user/:id",(req, res)=>{
    let index = user.findIndex(v => v.id===Number(req.params.id))
    user.splice(index,1)
    res.send({message:"User deleted Successfully"})
})
app.put("/user/:id",(req, res)=>{
    let index = user.findIndex(v => v.id===Number(req.params.id))
    user.splice(index,1,{id:Number(req.params.id),...req.body})
    res.send({message:"User updated Successfully"})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})