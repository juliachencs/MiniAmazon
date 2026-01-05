import type { Request, Response, NextFunction } from 'express';
import type { authRespond } from '../../types/authRespond.interface.js';
import { loginService } from '../../services/auth/login.service.js';

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const result : authRespond = await loginService(email, password);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};