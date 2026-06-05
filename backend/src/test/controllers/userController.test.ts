/*
 ****************************************************************************************************************************
 * Filename    : userController.test.ts
 * Description : Unit test cases for userController (CRUD request handlers)
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Request, Response, NextFunction } from 'express'

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../../controllers/userController'
import { MESSAGES } from '../../constants/messages'

// Shared mock service methods — available before vi.mock hoisting
const serviceMocks = vi.hoisted(() => ({
  createUser: vi.fn(),
  getUsers: vi.fn(),
  getUserById: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
}))

// Mock UserService so no DB connection is made
// Must use a named function (not arrow) — arrow functions cannot be called with `new`
vi.mock('../../services/userService', () => ({
  UserService: function UserService() {
    return serviceMocks
  },
}))

// Factory helpers
const mockReq = (
  body: Record<string, any> = {},
  params: Record<string, any> = {}
): Request => ({ body, params }) as unknown as Request

const mockRes = () => {
  const res = {} as Response
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

const mockNext = (): NextFunction => vi.fn() as unknown as NextFunction

const sampleUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@test.com',
  phone: '123-456-7890',
  gender: 'male',
}

describe('userController', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ─── createUser ────────────────────────────────────────────────────────────

  it('createUser — returns 201 with the new user on success', async () => {
    serviceMocks.createUser.mockResolvedValue(sampleUser)

    const req = mockReq(sampleUser)
    const res = mockRes()
    const next = mockNext()

    await createUser(req, res, next)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith(sampleUser)
  })

  it('createUser — calls next with error message on failure', async () => {
    serviceMocks.createUser.mockRejectedValue(new Error('DB error'))

    const req = mockReq(sampleUser)
    const res = mockRes()
    const next = mockNext()

    await createUser(req, res, next)

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ message: MESSAGES.USER_CREATE_FAILED_MSG })
    )
  })

  // ─── getUsers ──────────────────────────────────────────────────────────────

  it('getUsers — returns 200 with array of users on success', async () => {
    serviceMocks.getUsers.mockResolvedValue([sampleUser])

    const req = mockReq()
    const res = mockRes()
    const next = mockNext()

    await getUsers(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith([sampleUser])
  })

  it('getUsers — calls next with error message on failure', async () => {
    serviceMocks.getUsers.mockRejectedValue(new Error('DB error'))

    const req = mockReq()
    const res = mockRes()
    const next = mockNext()

    await getUsers(req, res, next)

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ message: MESSAGES.USER_FETCH_FAILED_MSG })
    )
  })

  // ─── getUserById ───────────────────────────────────────────────────────────

  it('getUserById — returns 200 with the user when found', async () => {
    serviceMocks.getUserById.mockResolvedValue(sampleUser)

    const req = mockReq({}, { id: '1' })
    const res = mockRes()
    const next = mockNext()

    await getUserById(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(sampleUser)
  })

  it('getUserById — returns 404 when user is not found', async () => {
    serviceMocks.getUserById.mockResolvedValue(null)

    const req = mockReq({}, { id: '99' })
    const res = mockRes()
    const next = mockNext()

    await getUserById(req, res, next)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: MESSAGES.USER_NOT_FOUND_MSG,
    })
  })

  it('getUserById — calls next with error message on failure', async () => {
    serviceMocks.getUserById.mockRejectedValue(new Error('DB error'))

    const req = mockReq({}, { id: '1' })
    const res = mockRes()
    const next = mockNext()

    await getUserById(req, res, next)

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: MESSAGES.USER_FETCH_SINGLE_FAILED_MSG,
      })
    )
  })

  // ─── updateUser ────────────────────────────────────────────────────────────

  it('updateUser — returns 200 with updated user on success', async () => {
    const updated = { ...sampleUser, name: 'Updated Name' }
    serviceMocks.updateUser.mockResolvedValue(updated)

    const req = mockReq(updated, { id: '1' })
    const res = mockRes()
    const next = mockNext()

    await updateUser(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(updated)
  })

  it('updateUser — returns 404 when user is not found', async () => {
    serviceMocks.updateUser.mockResolvedValue(null)

    const req = mockReq(sampleUser, { id: '99' })
    const res = mockRes()
    const next = mockNext()

    await updateUser(req, res, next)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: MESSAGES.USER_NOT_FOUND_MSG,
    })
  })

  it('updateUser — calls next with error message on failure', async () => {
    serviceMocks.updateUser.mockRejectedValue(new Error('DB error'))

    const req = mockReq(sampleUser, { id: '1' })
    const res = mockRes()
    const next = mockNext()

    await updateUser(req, res, next)

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ message: MESSAGES.USER_UPDATE_FAILED_MSG })
    )
  })

  // ─── deleteUser ────────────────────────────────────────────────────────────

  it('deleteUser — returns 200 with success message on success', async () => {
    serviceMocks.deleteUser.mockResolvedValue(true)

    const req = mockReq({}, { id: '1' })
    const res = mockRes()
    const next = mockNext()

    await deleteUser(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: MESSAGES.USER_DELETE_SUCCESS_MSG,
    })
  })

  it('deleteUser — returns 404 when user is not found', async () => {
    serviceMocks.deleteUser.mockResolvedValue(null)

    const req = mockReq({}, { id: '99' })
    const res = mockRes()
    const next = mockNext()

    await deleteUser(req, res, next)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: MESSAGES.USER_NOT_FOUND_MSG,
    })
  })

  it('deleteUser — calls next with error message on failure', async () => {
    serviceMocks.deleteUser.mockRejectedValue(new Error('DB error'))

    const req = mockReq({}, { id: '1' })
    const res = mockRes()
    const next = mockNext()

    await deleteUser(req, res, next)

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ message: MESSAGES.USER_DELETE_FAILED_MSG })
    )
  })
})
