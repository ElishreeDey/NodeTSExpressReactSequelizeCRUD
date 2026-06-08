/*
 ****************************************************************************************************************************
 * Filename    : userService
 * Description : Handles User business logic
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-26
 ****************************************************************************************************************************
 */

import { UserRepository } from '../repositories'

import { UserAttributes } from '../types'

const userRepository = new UserRepository()

export class UserService {
  // CREATE USER
  async createUser(data: UserAttributes) {
    return await userRepository.createUser(data)
  }

  // GET USERS
  async getUsers() {
    return await userRepository.getUsers()
  }

  // GET USER BY ID
  async getUserById(id: number) {
    return await userRepository.getUserById(id)
  }

  // UPDATE USER
  async updateUser(id: number, data: UserAttributes) {
    return await userRepository.updateUser(id, data)
  }

  // DELETE USER
  async deleteUser(id: number) {
    return await userRepository.deleteUser(id)
  }
}
