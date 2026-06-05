/*
 ****************************************************************************************************************************
 * Filename    : userService.test.ts
 * Description : Unit test cases for UserService (UserRepository is mocked)
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

import { UserService } from '../../services/userService'

// Shared mock functions created before vi.mock hoisting
const repoMocks = vi.hoisted(() => ({
  createUser: vi.fn(),
  getUsers: vi.fn(),
  getUserById: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
}))

// Mock UserRepository so no DB connection is made
// Must use a named function (not arrow) — arrow functions cannot be called with `new`
vi.mock('../../repositories/userRepository', () => ({
  UserRepository: function UserRepository() {
    return repoMocks
  },
}))

const sampleUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@test.com',
  phone: '123-456-7890',
  gender: 'male',
}

const service = new UserService()

describe('UserService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // --- createUser ---

  // Verify createUser delegates to repository
  it('createUser calls repository.createUser with the given data', async () => {
    repoMocks.createUser.mockResolvedValue(sampleUser)

    await service.createUser(sampleUser)

    expect(repoMocks.createUser).toHaveBeenCalledWith(sampleUser)
  })

  // Verify createUser returns repository result
  it('createUser returns the created user from repository', async () => {
    repoMocks.createUser.mockResolvedValue(sampleUser)

    const result = await service.createUser(sampleUser)

    expect(result).toEqual(sampleUser)
  })

  // --- getUsers ---

  // Verify getUsers delegates to repository
  it('getUsers calls repository.getUsers', async () => {
    repoMocks.getUsers.mockResolvedValue([sampleUser])

    await service.getUsers()

    expect(repoMocks.getUsers).toHaveBeenCalled()
  })

  // Verify getUsers returns repository result
  it('getUsers returns the list of users from repository', async () => {
    repoMocks.getUsers.mockResolvedValue([sampleUser])

    const result = await service.getUsers()

    expect(result).toEqual([sampleUser])
  })

  // --- getUserById ---

  // Verify getUserById delegates with correct id
  it('getUserById calls repository.getUserById with the given id', async () => {
    repoMocks.getUserById.mockResolvedValue(sampleUser)

    await service.getUserById(1)

    expect(repoMocks.getUserById).toHaveBeenCalledWith(1)
  })

  // Verify getUserById returns repository result
  it('getUserById returns the user from repository', async () => {
    repoMocks.getUserById.mockResolvedValue(sampleUser)

    const result = await service.getUserById(1)

    expect(result).toEqual(sampleUser)
  })

  // Verify getUserById returns null when not found
  it('getUserById returns null when repository returns null', async () => {
    repoMocks.getUserById.mockResolvedValue(null)

    const result = await service.getUserById(99)

    expect(result).toBeNull()
  })

  // --- updateUser ---

  // Verify updateUser delegates with id and data
  it('updateUser calls repository.updateUser with id and data', async () => {
    repoMocks.updateUser.mockResolvedValue(sampleUser)

    await service.updateUser(1, sampleUser)

    expect(repoMocks.updateUser).toHaveBeenCalledWith(1, sampleUser)
  })

  // Verify updateUser returns repository result
  it('updateUser returns the updated user from repository', async () => {
    const updated = { ...sampleUser, name: 'Updated Name' }
    repoMocks.updateUser.mockResolvedValue(updated)

    const result = await service.updateUser(1, updated)

    expect(result).toEqual(updated)
  })

  // --- deleteUser ---

  // Verify deleteUser delegates with correct id
  it('deleteUser calls repository.deleteUser with the given id', async () => {
    repoMocks.deleteUser.mockResolvedValue(true)

    await service.deleteUser(1)

    expect(repoMocks.deleteUser).toHaveBeenCalledWith(1)
  })

  // Verify deleteUser returns true on success
  it('deleteUser returns true when repository returns true', async () => {
    repoMocks.deleteUser.mockResolvedValue(true)

    const result = await service.deleteUser(1)

    expect(result).toBe(true)
  })

  // Verify deleteUser returns null when user not found
  it('deleteUser returns null when repository returns null', async () => {
    repoMocks.deleteUser.mockResolvedValue(null)

    const result = await service.deleteUser(99)

    expect(result).toBeNull()
  })
})
