/*
 ****************************************************************************************************************************
 * Filename    : errorMiddleware
 * Description : Centralized error handling middleware
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-26
 ****************************************************************************************************************************
 */

import { Request, Response, NextFunction } from 'express'

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('ERROR MIDDLEWARE:', error)

  res.status(error.status || 500).json({
    message: error.message || 'Internal Server Error',

    details: error.errors || null,
  })
}
