import { UserModel } from '../models/Users.js';

import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await UserModel.findOne({ username });
  const mail = await UserModel.findOne({ email });

  if(user){
    res.send({ message: "Username already exists" });
  } else if(mail){
    res.json({ message: "Email address already exists" });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username,
      password: hashPassword,
      email,
      articles: [],
      profilePic: undefined,
    });
    res.send({ message: "User registered successfully!", results: newUsere  });
  }
}
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if(user){
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(passwordMatch){
      const token = jwt.sign({ username, userId: user._id }, 'secret');
      res.send({ message: "You logged in successfully!", token, userId: user._id });
    } else {
      res.send({ message: "Incorrect password" });
    }
  } else {
    res.send({ message: "User not found" });
  }
}