import express from "express";


import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/users", async(req, res) => {
  const { userId } = req.body;
  console.log(userId)
  const user = await UserModel.findOne({ "_id":userId });
  if(user){
      res.json({ user })
  }
})

export { router as userInfosRouter };
