/*
 ****************************************************************************************************************************
 * Filename    : messages
 * Description : Application message constants
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-26
 ****************************************************************************************************************************
 */

export const MESSAGES = {
  USER_CREATE_FAILED_MSG: 'Failed to create user',
  USER_FETCH_FAILED_MSG: 'Failed to fetch users',
  USER_FETCH_SINGLE_FAILED_MSG: 'Failed to fetch user',
  USER_NOT_FOUND_MSG: 'User not found',
  USER_UPDATE_FAILED_MSG: 'Failed to update user',
  USER_DELETE_FAILED_MSG: 'Failed to delete user',
  USER_DELETE_SUCCESS_MSG: 'User deleted successfully',
  TOKEN_MISSING_MSG: 'Token missing',
  INVALID_TOKEN_MSG: 'Invalid token',
  JWT_SECRET_MISSING_MSG: 'JWT_SECRET is missing in .env',
  LOGIN_FAILED_MSG: 'Login failed',
  LOGIN_SUCCESS_MSG: 'Login successful',
  EMAIL_REQUIRED_MSG: 'Email is required to login',
  MISSING_EVN_VARIABLE_MSG:
    'Missing required database environment variables. Please set DB_HOST, DB_PORT, DB_USER, DB_PASSWORD and DB_NAME in your .env file.',
  DB_CON_SUCCESS_MSG: 'Database connected successfully',
  SERVER_RUNNING_ONPORT_MSG: 'Server running on port',
  RATE_LIMIT_EXCEED_MSG: 'Too many requests. Please try again later.',
}
