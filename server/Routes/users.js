import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import { UserModel } from "../models/Users.js";


const router = express.Router();


router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const user = await UserModel.findOne({ username })
    const mail = await UserModel.findOne({ email })


    if(user){
        res.json( { message : "Username already exist"})
    }else if(mail){
        res.json( { message : "Email address already exist"})
    }else{
        const hashPassword = await bcrypt.hash(password, 15)
    
        const newUser = new UserModel({
            username,
            password : hashPassword,
            email,
            articles : [],
            profilePic : undefined,
        })
    
        newUser.save()
    
        res.json( { message : "User registerd successfully !" })
    }
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne(username)

    if(user){
        bcrypt.compare(password, user.password), (err, res) => {
            if(err){
                res.json( {message : "mot de passe incorrect"})
            }else{
                const token = jwt.sign({ username, password})
                res.json({ mesage : "You logged in successfully !" , token, userId :  user.ObjectId})
            }
        }
    }
})



export { router as userRouter }