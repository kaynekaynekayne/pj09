import express from 'express';
import { register, login, logout, getLoggedInUser } from '../controllers/userController.js';
import { userRegisterValidator, userById } from '../middlewares/userMiddleware.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const userRouter=express.Router();

userRouter.post("/register", userRegisterValidator, register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.get("/user", verifyToken, userById, getLoggedInUser);

export default userRouter;