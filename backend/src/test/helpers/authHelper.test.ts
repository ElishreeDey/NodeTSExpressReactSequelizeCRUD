/*
 ****************************************************************************************************************************
 * Filename    : authHelper.test.ts
 * Description : Unit test cases for JWT helper functions
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

import { describe, it, expect } from 'vitest'

import { generateToken, verifyToken } from '../../helpers/authHelper'

describe('authHelper', () => {
  // Verify generateToken returns a string
  it('generateToken returns a string', () => {
    const token = generateToken({ email: 'test@test.com' })

    expect(typeof token).toBe('string')
  })

  // Verify token is non-empty
  it('generateToken returns a non-empty token', () => {
    const token = generateToken({ email: 'test@test.com' })

    expect(token.length).toBeGreaterThan(0)
  })

  // Verify token has three JWT segments
  it('generateToken returns a valid JWT structure', () => {
    const token = generateToken({ email: 'test@test.com' })

    expect(token.split('.')).toHaveLength(3)
  })

  // Verify verifyToken decodes the payload
  it('verifyToken returns an object with the original payload', () => {
    const token = generateToken({ email: 'user@test.com' })

    const decoded = verifyToken(token) as { email: string }

    expect(decoded.email).toBe('user@test.com')
  })

  // Verify different payloads produce different tokens
  it('generateToken produces different tokens for different payloads', () => {
    const token1 = generateToken({ email: 'a@test.com' })
    const token2 = generateToken({ email: 'b@test.com' })

    expect(token1).not.toBe(token2)
  })

  // Verify verifyToken throws on invalid token string
  it('verifyToken throws on an invalid token', () => {
    expect(() => verifyToken('invalid.token.value')).toThrow()
  })

  // Verify verifyToken throws on a tampered token
  it('verifyToken throws on a tampered token', () => {
    const token = generateToken({ email: 'user@test.com' })
    const tampered = token.slice(0, -5) + 'XXXXX'

    expect(() => verifyToken(tampered)).toThrow()
  })

  // Verify verifyToken throws on empty string
  it('verifyToken throws on empty string', () => {
    expect(() => verifyToken('')).toThrow()
  })
})
