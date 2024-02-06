import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const user = await UserModel.findOne({ username });
    const mail = await UserModel.findOne({ email });

    if(user){
        res.json({ message: "Username already exists" });
    } else if(mail){
        res.json({ message: "Email address already exists" });
    } else {
        const hashPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
            username,
            password: hashPassword,
            email,
            articles: [],
            profilePic: undefined,
        });
        res.json({ message: "User registered successfully!" });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if(user){
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(passwordMatch){
            const token = jwt.sign({ username, userId: user._id }, 'secret');
            res.json({ message: "You logged in successfully!", token, userId: user._id });
        } else {
            res.json({ message: "Incorrect password" });
        }
    } else {
        res.json({ message: "User not found" });
    }
});




export { router as userAuthRouter };
