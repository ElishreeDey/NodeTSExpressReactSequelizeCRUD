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

// Mock auth service — includes both verifyToken and getToken
vi.mock('../../services', () => ({
  authService: {
    verifyToken: vi.fn(),
    getToken: vi.fn(),
  },
}))

// Mock toast
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}))

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Verify: valid cookie skips login entirely
  it('skips login when verifyToken succeeds (valid cookie exists)', async () => {
    vi.mocked(authService.verifyToken).mockResolvedValue({} as any)

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isAuthenticating).toBe(false)
    })

    expect(authService.verifyToken).toHaveBeenCalled()
    expect(authService.getToken).not.toHaveBeenCalled()
  })

  // Verify: expired/missing cookie triggers fresh login
  it('calls getToken when verifyToken fails (cookie missing or expired)', async () => {
    vi.mocked(authService.verifyToken).mockRejectedValue(new Error('401'))
    vi.mocked(authService.getToken).mockResolvedValue({} as any)

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isAuthenticating).toBe(false)
    })

    expect(authService.verifyToken).toHaveBeenCalled()
    expect(authService.getToken).toHaveBeenCalled()
  })

  // Verify: isAuthenticating is false after successful verifyToken
  it('sets isAuthenticating to false after verifyToken succeeds', async () => {
    vi.mocked(authService.verifyToken).mockResolvedValue({} as any)

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isAuthenticating).toBe(false)
    })
  })

  // Verify: isAuthenticating is false after successful getToken (fallback login)
  it('sets isAuthenticating to false after getToken succeeds', async () => {
    vi.mocked(authService.verifyToken).mockRejectedValue(new Error('401'))
    vi.mocked(authService.getToken).mockResolvedValue({} as any)

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isAuthenticating).toBe(false)
    })
  })

  // Verify: toast shown when both verifyToken and getToken fail
  it('shows toast error when both verifyToken and getToken fail', async () => {
    vi.mocked(authService.verifyToken).mockRejectedValue(new Error('401'))
    vi.mocked(authService.getToken).mockRejectedValue(new Error('Login failed'))

    renderHook(() => useAuth())

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        CONSOLE_MSG.authenticationFailedErr
      )
    })
  })

  // Verify: isAuthenticating false even when both calls fail
  it('sets isAuthenticating to false after both verifyToken and getToken fail', async () => {
    vi.mocked(authService.verifyToken).mockRejectedValue(new Error('401'))
    vi.mocked(authService.getToken).mockRejectedValue(new Error('Login failed'))

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isAuthenticating).toBe(false)
    })
  })
})
