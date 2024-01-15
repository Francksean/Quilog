import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { userRouter } from './Routes/users.js'


const app = express()

app.use(express.json())
app.use(cors())

app.use("/auth", userRouter)

mongoose.connect(
    "mongodb+srv://seandjissou:g9LlX2IeLGIaPbEF@quilogcluster.ivatx2e.mongodb.net/?retryWrites=true&w=majority"
)


app.listen(3001,()=>{
    console.log("\n\n\n\n\n\n\nServer started on port 3001")
})