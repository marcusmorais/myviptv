import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: 'error',
      errors: err.serializeErrors(),
    });
  }

  console.error(err); // Log para erros não tratados

  res.status(500).json({
    status: 'error',
    errors: [{ message: 'Something went wrong' }],
  });
};