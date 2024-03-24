import express from "express";

const router = express.Router();

import * as usersController from '../controllers/users-controller.js'

router.post("/register", usersController.registerUser );

router.post("/login", usersController.loginUser);

router.post("/users/update/fields", usersController.updateUserInfos )

router.get("/getUserBrief/:userId", usersController.getUserBrief )

router.post("/getUser/:userId", usersController.getUserById)

// router.post("/users/update/arrays", async(req, res) => {
//   const { userId, updatedValue, field } = req.body;
//   console.log(`id : ${userId} | updatedValue : ${updatedValue} | field : ${field}`)
//   await UserModel.updateOne(
//     { "_id":userId },
//     {
//       $push : { [field]: updatedValue}
//     }
//   )
// })


export { router as userRouter };
