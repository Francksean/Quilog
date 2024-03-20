import { UserModel } from '../models/Users.js';

import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
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
}
export const loginUser = async (req, res) => {
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
}

export const updateUserInfos = async(req, res) => {
  const { userId, updatedValue, field } = req.body;
  console.log(`id : ${userId} | updatedValue : ${updatedValue} | field : ${field}`)
  const fieldUpdater = await UserModel.updateOne(
    { "_id":userId },
    {
      $set : { [field]: updatedValue}
    }
  )
  if(fieldUpdater){
    res.send({ message:"datas updated correctly" })
  }
}

export const getUserBrief = async(req, res) => {
  const { userId } = req.params;
  const userBrief = await UserModel.findOne(
    { "_id":userId },
    { profilePic: 1, username: 1}
  );
  if(userBrief){
    res.send({ profilePic : userBrief.profilePic, username: userBrief.username })
  }
}

export const getUserById =  async(req, res) => {
  const { userId } = req.params;
  const user = await UserModel.findOne({ "_id":userId });
  if(user){
    res.json({ user })
  }
}

