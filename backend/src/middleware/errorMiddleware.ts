/*
 ****************************************************************************************************************************
 * Filename    : errorMiddleware
 * Description : Centralized error handling middleware
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-26
 ****************************************************************************************************************************
 */

import { Request, Response, NextFunction } from 'express'

import { MESSAGES } from '../constants'

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[${MESSAGES.INTERNAL_SERVER_ERROR_MSG}]`, error)

  // Send message to the client. Full error is in console.error
  res.status(error.status || 500).json({
    message: MESSAGES.SOMETHING_WENT_WRONG_MSG,
  })
}
