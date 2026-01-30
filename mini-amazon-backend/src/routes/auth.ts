import { Router } from "express";
import * as authController from "../controllers/auth/auth.controller.js"


export const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/signup', authController.signup);
authRouter.post('/recover', authController.recoverPassword);
authRouter.post('/signout', authController.signout);