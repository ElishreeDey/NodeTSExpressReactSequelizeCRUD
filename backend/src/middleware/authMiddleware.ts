/*
 ****************************************************************************************************************************
 * Filename    : authMiddleware
 * Description : JWT authentication middleware
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-26
 ****************************************************************************************************************************
 */

import { Request, Response, NextFunction } from 'express'

import { verifyToken } from '../helpers'
import { MESSAGES } from '../constants'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Read token from HttpOnly cookie (set by login endpoint)
    const token = req.cookies?.token

    // Check token exists
    if (!token) {
      return res.status(401).json({
        message: MESSAGES.TOKEN_MISSING_MSG,
      })
    }

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
