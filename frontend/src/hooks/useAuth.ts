/*
 ****************************************************************************************************************************
 * Filename    : useAuth
 * Description : Custom hook for application authentication and token management
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

import { useEffect, useState } from 'react'
import { authService } from '../services'
import { toast } from 'react-toastify'
import { CONSOLE_MSG } from '../constants'

export function useAuth() {
  // Track authentication status
  const [isAuthenticating, setIsAuthenticating] = useState(true)

  useEffect(() => {
    // Authenticate user and store token
    const authenticate = async () => {
      try {
        const token = await authService.getToken()

        // Validate token response
        if (!token) {
          throw new Error(CONSOLE_MSG.noTokenReturnErr)
        }

        // Save token in local storage
        localStorage.setItem('token', token)

        console.log(CONSOLE_MSG.tokenSuccessMsg)
      } catch (error) {
        // Handle authentication failure
        console.error(CONSOLE_MSG.failedToGetTokenErr, error)

        toast.error(CONSOLE_MSG.authenticationFailedErr)
      } finally {
        // Mark authentication process complete
        setIsAuthenticating(false)
      }
    }

    authenticate()
  }, [])

  return { isAuthenticating }
}
