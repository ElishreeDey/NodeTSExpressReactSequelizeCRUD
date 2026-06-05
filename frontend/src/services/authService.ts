/*
 ****************************************************************************************************************************
 * Filename    : authService
 * Description : Handles authentication API calls — fetches JWT token from backend login endpoint
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-03
 ****************************************************************************************************************************
 */

import api from './api'

// Read the full base API URL from environment variable (e.g. http://localhost:3000/api)
const BASE_URL = import.meta.env.VITE_API_BASE_URL

// Read the email used to generate a JWT token from environment variable
const EMAIL = import.meta.env.VITE_EMAIL_TO_GENERATE_TOKEN

export const authService = {
  // Checks if the existing HttpOnly cookie token is still valid.
  // Returns 200 if valid, throws if missing or expired.
  async verifyToken() {
    return api.get(`${BASE_URL}/verify`)
  },

  // Calls the backend login endpoint — backend sets a fresh HttpOnly cookie on the response.
  // BASE_URL is used here explicitly because the login call needs the full absolute URL.
  async getToken() {
    return api.post(`${BASE_URL}/login`, { email: EMAIL })
  },
}
