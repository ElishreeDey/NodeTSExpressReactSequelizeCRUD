/*
 ****************************************************************************************************************************
 * Filename    : authMiddleware.test.ts
 * Description : Unit test cases for authMiddleware (JWT token verification)
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Request, Response, NextFunction } from 'express'

import { authMiddleware } from '../../middleware/authMiddleware'
import { MESSAGES } from '../../constants/messages'

// Shared mock for authHelper so real JWT logic does not run
const helperMocks = vi.hoisted(() => ({
  generateToken: vi.fn(),
  verifyToken: vi.fn(),
}))

vi.mock('../../helpers/authHelper', () => helperMocks)

// Factory helpers
const mockReq = (headers: Record<string, string> = {}): Request =>
  ({ headers }) as unknown as Request

const mockRes = () => {
  const res = {} as Response
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

const mockNext = (): NextFunction => vi.fn() as unknown as NextFunction

describe('authMiddleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Verify missing Authorization header returns 401
  it('returns 401 when Authorization header is absent', () => {
    const req = mockReq()
    const res = mockRes()
    const next = mockNext()

    authMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      message: MESSAGES.TOKEN_MISSING_MSG,
    })
  })

  // Verify next() is called for a valid token
  it('calls next() when a valid Bearer token is provided', () => {
    helperMocks.verifyToken.mockReturnValue({ email: 'user@test.com' })

    const req = mockReq({ authorization: 'Bearer valid-token' })
    const res = mockRes()
    const next = mockNext()

    authMiddleware(req, res, next)

    expect(helperMocks.verifyToken).toHaveBeenCalledWith('valid-token')
    expect(next).toHaveBeenCalled()
  })

  // Verify no error response is sent when token is valid
  it('does not send a response when token is valid', () => {
    helperMocks.verifyToken.mockReturnValue({ email: 'user@test.com' })

    const req = mockReq({ authorization: 'Bearer valid-token' })
    const res = mockRes()
    const next = mockNext()

    authMiddleware(req, res, next)

    expect(res.status).not.toHaveBeenCalled()
  })

  // Verify verifyToken receives only the token part (without "Bearer ")
  it('strips the Bearer prefix before calling verifyToken', () => {
    helperMocks.verifyToken.mockReturnValue({ email: 'user@test.com' })

    const req = mockReq({ authorization: 'Bearer my-jwt-token' })
    const res = mockRes()
    const next = mockNext()

    authMiddleware(req, res, next)

    expect(helperMocks.verifyToken).toHaveBeenCalledWith('my-jwt-token')
  })

  // Verify invalid token returns 401
  it('returns 401 when verifyToken throws (invalid token)', () => {
    helperMocks.verifyToken.mockImplementation(() => {
      throw new Error('Invalid token')
    })

    const req = mockReq({ authorization: 'Bearer bad-token' })
    const res = mockRes()
    const next = mockNext()

    authMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      message: MESSAGES.INVALID_TOKEN_MSG,
    })
  })

  // Verify next() is NOT called for invalid token
  it('does not call next() when token verification fails', () => {
    helperMocks.verifyToken.mockImplementation(() => {
      throw new Error('Invalid token')
    })

    const req = mockReq({ authorization: 'Bearer bad-token' })
    const res = mockRes()
    const next = mockNext()

    authMiddleware(req, res, next)

    expect(next).not.toHaveBeenCalled()
  })
})
