/*
 ****************************************************************************************************************************
 * Filename    : userRepository.test.ts
 * Description : Unit test cases for UserRepository (Sequelize User model is mocked)
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'

import { UserRepository } from '../../repositories/userRepository'
import User from '../../models/userModel'

// Mock the Sequelize User model to avoid a real DB connection
vi.mock('../../models/userModel', () => ({
  default: {
    create: vi.fn(),
    findAll: vi.fn(),
    findByPk: vi.fn(),
  },
}))

const sampleUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@test.com',
  phone: '123-456-7890',
  gender: 'male',
}

// Mock instance returned by findByPk (includes Sequelize instance methods)
const mockUserInstance = {
  ...sampleUser,
  update: vi.fn(),
  destroy: vi.fn(),
}

const repository = new UserRepository()

describe('UserRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // --- createUser ---

  // Verify createUser delegates to User.create
  it('createUser calls User.create with correct data', async () => {
    vi.mocked(User.create).mockResolvedValue(sampleUser as any)

    await repository.createUser(sampleUser)

    expect(User.create).toHaveBeenCalledWith(sampleUser)
  })

  // Verify createUser returns the created record
  it('createUser returns the created user', async () => {
    vi.mocked(User.create).mockResolvedValue(sampleUser as any)

    const result = await repository.createUser(sampleUser)

    expect(result).toEqual(sampleUser)
  })

  // --- getUsers ---

  // Verify getUsers calls User.findAll with DESC order
  it('getUsers calls User.findAll with id DESC order', async () => {
    vi.mocked(User.findAll).mockResolvedValue([sampleUser] as any)

    await repository.getUsers()

    expect(User.findAll).toHaveBeenCalledWith({ order: [['id', 'DESC']] })
  })

  // Verify getUsers returns the list from the model
  it('getUsers returns the array of users', async () => {
    vi.mocked(User.findAll).mockResolvedValue([sampleUser] as any)

    const result = await repository.getUsers()

    expect(result).toEqual([sampleUser])
  })

  // --- getUserById ---

  // Verify getUserById calls User.findByPk with correct id
  it('getUserById calls User.findByPk with the given id', async () => {
    vi.mocked(User.findByPk).mockResolvedValue(sampleUser as any)

    await repository.getUserById(1)

    expect(User.findByPk).toHaveBeenCalledWith(1)
  })

  // Verify getUserById returns the found user
  it('getUserById returns the user when found', async () => {
    vi.mocked(User.findByPk).mockResolvedValue(sampleUser as any)

    const result = await repository.getUserById(1)

    expect(result).toEqual(sampleUser)
  })

  // Verify getUserById returns null when not found
  it('getUserById returns null when user does not exist', async () => {
    vi.mocked(User.findByPk).mockResolvedValue(null as any)

    const result = await repository.getUserById(99)

    expect(result).toBeNull()
  })

  // --- updateUser ---

  // Verify updateUser calls findByPk then update on the instance
  it('updateUser calls findByPk and then updates the user', async () => {
    vi.mocked(User.findByPk).mockResolvedValue(mockUserInstance as any)
    mockUserInstance.update.mockResolvedValue({
      ...sampleUser,
      name: 'Updated',
    })

    await repository.updateUser(1, { ...sampleUser, name: 'Updated' })

    expect(User.findByPk).toHaveBeenCalledWith(1)
    expect(mockUserInstance.update).toHaveBeenCalledWith({
      ...sampleUser,
      name: 'Updated',
    })
  })

  // Verify updateUser returns null when user not found
  it('updateUser returns null when user does not exist', async () => {
    vi.mocked(User.findByPk).mockResolvedValue(null as any)

    const result = await repository.updateUser(99, sampleUser)

    expect(result).toBeNull()
  })

  // --- deleteUser ---

  // Verify deleteUser calls findByPk then destroy on the instance
  it('deleteUser calls findByPk and then destroys the user', async () => {
    vi.mocked(User.findByPk).mockResolvedValue(mockUserInstance as any)
    mockUserInstance.destroy.mockResolvedValue(undefined)

    await repository.deleteUser(1)

    expect(User.findByPk).toHaveBeenCalledWith(1)
    expect(mockUserInstance.destroy).toHaveBeenCalled()
  })

  // Verify deleteUser returns true on success
  it('deleteUser returns true when user is deleted', async () => {
    vi.mocked(User.findByPk).mockResolvedValue(mockUserInstance as any)
    mockUserInstance.destroy.mockResolvedValue(undefined)

    const result = await repository.deleteUser(1)

    expect(result).toBe(true)
  })

  // Verify deleteUser returns null when user not found
  it('deleteUser returns null when user does not exist', async () => {
    vi.mocked(User.findByPk).mockResolvedValue(null as any)

    const result = await repository.deleteUser(99)

    expect(result).toBeNull()
  })
})
