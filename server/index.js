import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'


const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(
    "mongodb+srv://seandjissou:g9LlX2IeLGIaPbEF@quilogcluster.ivatx2e.mongodb.net/?retryWrites=true&w=majority"
)


app.listen(3000,()=>{
    console.log("\n\n\n\n\n\n\nServer started on port 3000")
})