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
        // Check if a valid cookie token already exists
        await authService.verifyToken()
      } catch {
        // Cookie missing or expired — get a fresh token
        try {
          await authService.getToken()
        } catch (error) {
          // Handle authentication failure
          console.error(CONSOLE_MSG.failedToGetTokenErr, error)

          toast.error(CONSOLE_MSG.authenticationFailedErr)
        }
      } finally {
        // Mark authentication process complete
        setIsAuthenticating(false)
      }
    }

    void authenticate()
  }, [])

  return {
    isAuthenticating,
  }
}
