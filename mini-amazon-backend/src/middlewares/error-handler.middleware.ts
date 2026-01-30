import type { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/http.error.js';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message
    })
  }
  else {
    console.error(err);

    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};