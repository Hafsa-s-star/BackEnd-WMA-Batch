import app from "./src/app.js"
import connectDB from "./src/db/db.js"
const port = 7000
 connectDB()

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})