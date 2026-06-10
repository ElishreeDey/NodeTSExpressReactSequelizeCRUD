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
import { keys } from '../config'

export const apiRateLimiter = rateLimit({
  // Time window: 15 minutes
  windowMs: 15 * 60 * 1000,

  // Max requests per IP — value comes from key > RATE_LIMIT_MAX in .env
  max: keys.rateLimitMax,

  // Response when limit exceeded
  message: {
    message: MESSAGES.RATE_LIMIT_EXCEED_MSG,
  },

  // Use modern rate limit headers
  standardHeaders: true,

  // Disable legacy headers
  legacyHeaders: false,
})
