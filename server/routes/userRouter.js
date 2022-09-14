import express from 'express';
import { register } from '../controllers/userController.js';
import { userRegisterValidator } from '../middlewares/userMiddleware.js';

const userRouter=express.Router();

userRouter.post("/register", userRegisterValidator, register);

export default userRouter;