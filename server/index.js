import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { userAuthRouter } from './Routes/usersAuth.js'
import { userInfosRouter } from './Routes/usersInfos.js'
import { articlesRouter } from './Routes/articles.js'


const app = express()

app.use(express.json())
app.use(cors())

app.use("/auth", userAuthRouter)
app.use("/infos", userInfosRouter)
app.use("/content", articlesRouter)

mongoose.connect(
    "mongodb+srv://seandjissou:adminquilog@quilogcluster.ivatx2e.mongodb.net/Quilog?retryWrites=true&w=majority"
)


app.listen(3000,()=>{
    console.log("\n\n\n\n\n\n\nServer started on port 3000")
})