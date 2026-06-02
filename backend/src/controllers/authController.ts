/*
 ****************************************************************************************************************************
 * Filename    : authController
 * Description : Generate Authentication TOKEN for API calls.
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-27
 ****************************************************************************************************************************
 */

import { Request, Response, NextFunction } from 'express'

import { generateToken } from '../helpers/authHelper'
import { MESSAGES } from '../constants/messages'

// LOGIN API
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Read email from request body
    const email = req.body.email?.trim()

    // Validate Email
    if (!email) {
      return res.status(400).json({
        message: MESSAGES.EMAIL_REQUIRED_MSG,
      })
    }

    // Generate JWT Token
    const token = generateToken({
      email,
    })

    // Send Response
    res.status(200).json({
      message: MESSAGES.LOGIN_SUCCESS_MSG,
      token,
    })
  } catch (error) {
    next(error)
  }
}
