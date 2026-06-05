/*
 ****************************************************************************************************************************
 * Filename    : useAuth.test.ts
 * Description : Unit test cases for useAuth custom hook
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useAuth } from '../../hooks/useAuth'
import { authService } from '../../services'
import { toast } from 'react-toastify'
import { CONSOLE_MSG } from '../../constants'

// Mock auth service
vi.mock('../../services', () => ({
  authService: {
    getToken: vi.fn(),
  },
}))

// Mock toast
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}))

// Mock localStorage
const setItemMock = vi.fn()

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: setItemMock,
    getItem: vi.fn(),
    removeItem: vi.fn(),
  },
  writable: true,
})

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Verify token is stored
  it('stores token in localStorage', async () => {
    vi.mocked(authService.getToken).mockResolvedValue('sample-token')

    renderHook(() => useAuth())

    await waitFor(() => {
      expect(setItemMock).toHaveBeenCalledWith('token', 'sample-token')
    })

    expect(authService.getToken).toHaveBeenCalled()
  })

  // Verify authentication completes after success
  it('sets isAuthenticating to false after success', async () => {
    vi.mocked(authService.getToken).mockResolvedValue('sample-token')

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isAuthenticating).toBe(false)
    })
  })

  // Verify toast on API failure
  it('shows toast error when authentication fails', async () => {
    vi.mocked(authService.getToken).mockRejectedValue(
      new Error('Authentication Failed')
    )

    renderHook(() => useAuth())

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        CONSOLE_MSG.authenticationFailedErr
      )
    })
  })

  // Verify loading state after failure
  it('sets isAuthenticating to false after failure', async () => {
    vi.mocked(authService.getToken).mockRejectedValue(
      new Error('Authentication Failed')
    )

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isAuthenticating).toBe(false)
    })
  })

  // Verify missing token handling
  it('shows toast when no token is returned', async () => {
    vi.mocked(authService.getToken).mockResolvedValue(null as any)

    renderHook(() => useAuth())

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        CONSOLE_MSG.authenticationFailedErr
      )
    })
  })
})
