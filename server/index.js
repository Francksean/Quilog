import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { userRouter } from './routes/users-router.js'
import { articlesRouter } from './routes/articles-router.js'
import * as auth from './middlewares/auth.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use("/users", auth.verifyToken, userRouter)
app.use("/articles", auth.verifyToken, articlesRouter)

mongoose.connect("mongodb+srv://seandjissou:adminquilog@quilogcluster.ivatx2e.mongodb.net/Quilog?retryWrites=true&w=majority")

app.listen(3000,()=>{
    console.log("\n\n\n\n\n\n\nServer started on port 3000")
})