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

    // Set token as HttpOnly cookie — browser stores it automatically.
    // HttpOnly: JS cannot read it (blocks XSS token theft).
    // secure: HTTPS only in production, allows HTTP in local dev.
    // sameSite strict: cookie is not sent on cross-site requests (blocks CSRF).
    // maxAge: cookie expires after 1 day.
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.status(200).json({ message: MESSAGES.LOGIN_SUCCESS_MSG })
  } catch (error) {
    next(error)
  }
}
