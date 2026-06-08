/*
 ****************************************************************************************************************************
 * Filename    : authHelper
 * Description : JWT helper functions
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-26
 ****************************************************************************************************************************
 */

// JWT are JWT default functions used for create token. JWtPayload is an named interface which tells typescript that its a decoded form
import jwt, { JwtPayload } from 'jsonwebtoken'

import { MESSAGES } from '../constants'

// Read JWT Secret from .env
const JWT_SECRET = process.env.JWT_SECRET

// Validate JWT Secret
if (!JWT_SECRET) {
  throw new Error(MESSAGES.JWT_SECRET_MISSING_MSG)
}

// Generate Token
export const generateToken = (
  payload: object //here payload is the info used to generate token e.g: email is used to generate token with secret key.
): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1d', // Token valid for 1 day
  })
}

// Verify Token
export const verifyToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, JWT_SECRET)
}
