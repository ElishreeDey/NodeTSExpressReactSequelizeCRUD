/*
 ****************************************************************************************************************************
 * Filename    : keys
 * Description : Single source of truth for all environment variables.
 *               Calls dotenv once, validates every required variable at
 *               startup, and exports typed constants so no other file
 *               reads process.env directly.
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-10
 ****************************************************************************************************************************
 */

import dotenv from 'dotenv'

import { MESSAGES } from '../constants/messages'

// Load .env file before any validation runs
dotenv.config()

// All variables that must be present for the app to start
const REQUIRED_VARS = [
  'JWT_SECRET',
  'CLIENT_URL',
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
] as const

// Fail fast — crash here before any DB/JWT module even loads
const missingVars = REQUIRED_VARS.filter((key) => !process.env[key])
if (missingVars.length > 0) {
  throw new Error(`${MESSAGES.MISSING_REQUIRED_ENV_MSG} ${missingVars.join(', ')}`)
}

export const keys = {
  // Server
  port: Number(process.env.PORT) || 3000,
  clientUrl: process.env.CLIENT_URL as string,

  // Auth
  jwtSecret: process.env.JWT_SECRET as string,

  // Rate limiting — optional, defaults to 100 requests per 15 min window
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX) || 100,

  // Database
  db: {
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    name: process.env.DB_NAME as string,
  },
}
