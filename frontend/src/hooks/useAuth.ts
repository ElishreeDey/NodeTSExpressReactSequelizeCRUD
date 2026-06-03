import { useEffect, useState } from 'react'
import { authService } from '../services'
import { toast } from 'react-toastify'
import { CONSOLE_MSG } from '../constants'

export function useAuth() {
  const [isAuthenticating, setIsAuthenticating] = useState(true)

  useEffect(() => {
    const authenticate = async () => {
      try {
        const token = await authService.getToken()

        if (!token) {
          throw new Error(CONSOLE_MSG.noTokenReturnErr)
        }

        localStorage.setItem('token', token)
        console.log(CONSOLE_MSG.tokenSuccessMsg)
      } catch (error) {
        console.error(CONSOLE_MSG.failedToGetTokenErr, error)
        toast.error(CONSOLE_MSG.authenticationFailedErr)
      } finally {
        setIsAuthenticating(false)
      }
    }

    authenticate()
  }, [])

  return { isAuthenticating }
}
