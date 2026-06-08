/*
 ****************************************************************************************************************************
 * Filename    : userRepository
 * Description : Repository handles all direct database calls.
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-26
 ****************************************************************************************************************************
 */

import User from '../models'

import { UserAttributes } from '../types'

export class UserRepository {
  // CREATE USER
  async createUser(data: UserAttributes) {
    return await User.create(data)
  }

  // GET ALL USERS
  async getUsers() {
    return await User.findAll({
      order: [['id', 'DESC']], // newest first
    })
  }

  // GET USER BY ID
  async getUserById(id: number) {
    return await User.findByPk(id)
  }

  // UPDATE USER
  async updateUser(id: number, data: UserAttributes) {
    const user = await User.findByPk(id)

    if (!user) {
      return null
    }

    return await user.update(data)
  }

  // DELETE USER
  async deleteUser(id: number) {
    const user = await User.findByPk(id)

    if (!user) {
      return null
    }

    await user.destroy()

    return true
  }
}
