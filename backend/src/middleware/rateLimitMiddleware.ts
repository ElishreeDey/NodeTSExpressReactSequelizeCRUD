/*
 ****************************************************************************************************************************
 * Filename    : rateLimitMiddleware
 * Description : API rate limiting middleware to prevent abuse and spam requests
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-28
 ****************************************************************************************************************************
 */

import rateLimit from 'express-rate-limit'

import { MESSAGES } from '../constants'

export const apiRateLimiter = rateLimit({
  // Time window: 15 minutes
  windowMs: 15 * 60 * 1000,

  // Max requests allowed per IP, e.g: if max is 5 then in 15min max 5 calls are possible.
  //max: 5,
  max: Number(process.env.RATE_LIMIT_MAX) || 100,

  // Response when limit exceeded
  message: {
    message: MESSAGES.RATE_LIMIT_EXCEED_MSG,
  },

  // Use modern rate limit headers
  standardHeaders: true,

  // Disable legacy headers
  legacyHeaders: false,
})
