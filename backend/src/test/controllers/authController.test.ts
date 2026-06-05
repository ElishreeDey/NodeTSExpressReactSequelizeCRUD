/*
 ****************************************************************************************************************************
 * Filename    : authController.test.ts
 * Description : Unit test cases for authController (login endpoint)
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Request, Response, NextFunction } from 'express'

import { login } from '../../controllers/authController'
import { MESSAGES } from '../../constants/messages'

// Mock authHelper so the real JWT logic does not run and JWT_SECRET is not needed here
const helperMocks = vi.hoisted(() => ({
  generateToken: vi.fn(),
  verifyToken: vi.fn(),
}))

vi.mock('../../helpers/authHelper', () => helperMocks)

// Factory helpers
const mockReq = (body: Record<string, any> = {}): Request =>
  ({ body }) as unknown as Request

const mockRes = () => {
  const res = {} as Response
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

const mockNext = (): NextFunction => vi.fn() as unknown as NextFunction

describe('authController — login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Verify valid email returns 200 with token
  it('returns 200 and a token when email is provided', async () => {
    helperMocks.generateToken.mockReturnValue('mock-jwt-token')

    const req = mockReq({ email: 'user@test.com' })
    const res = mockRes()
    const next = mockNext()

    await login(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: MESSAGES.LOGIN_SUCCESS_MSG,
      token: 'mock-jwt-token',
    })
  })

  // Verify generateToken is called with the trimmed email
  it('calls generateToken with the trimmed email', async () => {
    helperMocks.generateToken.mockReturnValue('mock-jwt-token')

    const req = mockReq({ email: '  user@test.com  ' })
    const res = mockRes()
    const next = mockNext()

    await login(req, res, next)

    expect(helperMocks.generateToken).toHaveBeenCalledWith({
      email: 'user@test.com',
    })
  })

  // Verify missing email returns 400
  it('returns 400 when email is not provided', async () => {
    const req = mockReq({})
    const res = mockRes()
    const next = mockNext()

    await login(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: MESSAGES.EMAIL_REQUIRED_MSG,
    })
  })

  // Verify empty string email returns 400
  it('returns 400 when email is an empty string', async () => {
    const req = mockReq({ email: '   ' })
    const res = mockRes()
    const next = mockNext()

    await login(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: MESSAGES.EMAIL_REQUIRED_MSG,
    })
  })

  // Verify unexpected error is forwarded to next
  it('calls next with error when generateToken throws', async () => {
    const error = new Error('Token generation failed')
    helperMocks.generateToken.mockImplementation(() => {
      throw error
    })

    const req = mockReq({ email: 'user@test.com' })
    const res = mockRes()
    const next = mockNext()

    await login(req, res, next)

    expect(next).toHaveBeenCalledWith(error)
  })
})
