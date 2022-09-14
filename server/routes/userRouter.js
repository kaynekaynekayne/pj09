import express from 'express';
import { register, login } from '../controllers/userController.js';
import { userRegisterValidator } from '../middlewares/userMiddleware.js';

const userRouter=express.Router();

userRouter.post("/register", userRegisterValidator, register);
userRouter.post("/login", login);

export default userRouter;