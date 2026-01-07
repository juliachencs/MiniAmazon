import type { Request, Response, NextFunction } from 'express';
import type { authRespond } from '../../types/authRespond.interface.js';
import { loginService } from '../../services/auth/login.service.js';

export async function loginController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
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