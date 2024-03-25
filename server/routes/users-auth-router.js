import express from "express";

const router = express.Router();

import * as usersAuthController from '../controllers/users-auth-controller.js'

router.post("/register", usersAuthController.registerUser );

router.post("/login", usersAuthController.loginUser);

export { router as userAuthRouter };
