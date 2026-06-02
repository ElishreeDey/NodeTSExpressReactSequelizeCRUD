/*
 ****************************************************************************************************************************
 * Filename    : authMiddleware
 * Description : JWT authentication middleware
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-26
 ****************************************************************************************************************************
 */

import { Request, Response, NextFunction } from 'express'

import { verifyToken } from '../helpers/authHelper'
import { MESSAGES } from '../constants/messages'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Read Authorization Header
    const authHeader = req.headers.authorization

    // Check token exists
    if (!authHeader) {
      return res.status(401).json({
        message: MESSAGES.TOKEN_MISSING_MSG,
      })
    }

    // Remove Bearer
    const token = authHeader.split(' ')[1]

    // Verify JWT
    verifyToken(token)

    // Continue
    next()
  } catch (error) {
    return res.status(401).json({
      message: MESSAGES.INVALID_TOKEN_MSG,
    })
  }
}
