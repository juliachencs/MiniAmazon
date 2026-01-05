import { Router } from "express";
import { authRouter } from "./auth.js";

export const rootRouter = Router();
rootRouter.use('/auth', authRouter);