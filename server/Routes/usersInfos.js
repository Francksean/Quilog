import express from "express";


import { UserModel } from "../models/Users.js";

const router = express.Router();


router.post("/users/update/fields", async(req, res) => {
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
})

router.post("/users/update/arrays", async(req, res) => {
  const { userId, updatedValue, field } = req.body;
  console.log(`id : ${userId} | updatedValue : ${updatedValue} | field : ${field}`)
  await UserModel.updateOne(
    { "_id":userId },
    {
      $push : { [field]: updatedValue}
    }
  )
})

router.post("/users/userBrief", async(req, res) => {
  const { userId } = req.body;
  const userBrief = await UserModel.findOne(
    { "_id":userId },
    { profilePic: 1, username: 1}
  );
  if(userBrief){
    console.log("userbrief arriving")
    res.send({ profilePic : userBrief.profilePic, username: userBrief.username })
  }
})

router.post("/users", async(req, res) => {
  const { userId } = req.body;
  const user = await UserModel.findOne({ "_id":userId });
  if(user){
    res.json({ user })
  }
})



export { router as userInfosRouter };
