import { Router } from "express";
import { loginController } from "../controllers/auth/login.controller.js";
import { signupController } from "../controllers/auth/signup.controller.js";
import { recoverPasswordController } from "../controllers/auth/recover-password.contoller.js";
import { signoutController } from "../controllers/auth/signout.contoller.js";


export const authRouter = Router();

authRouter.post('/login', loginController);
authRouter.post('/signup', signupController);
authRouter.post('/recover', recoverPasswordController);
authRouter.post('/signout', signoutController);