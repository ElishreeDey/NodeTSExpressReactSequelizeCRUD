/*
 ****************************************************************************************************************************
 * Filename    : userController
 * Description : Handles User APIs
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-25
 ****************************************************************************************************************************
 */

import { Request, Response, NextFunction } from 'express'

import { UserService } from '../services/userService'
import { MESSAGES } from '../constants/messages'

const userService = new UserService()

// CREATE USER
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.createUser(req.body)
    res.status(201).json(user)
  } catch (error: any) {
    error.message = MESSAGES.USER_CREATE_FAILED_MSG
    next(error)
  }
}

// GET USERS
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getUsers()
    res.status(200).json(users)
  } catch (error: any) {
    error.message = MESSAGES.USER_FETCH_FAILED_MSG
    next(error)
  }
}

// GET USER BY ID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.params.id)
    const user = await userService.getUserById(userId)
    if (!user) {
      return res.status(404).json({
        message: MESSAGES.USER_NOT_FOUND_MSG,
      })
    }
    res.status(200).json(user)
  } catch (error: any) {
    error.message = MESSAGES.USER_FETCH_SINGLE_FAILED_MSG
    next(error)
  }
}

// UPDATE USER
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.params.id)
    const user = await userService.updateUser(userId, req.body)
    if (!user) {
      return res.status(404).json({
        message: MESSAGES.USER_NOT_FOUND_MSG,
      })
    }
    res.status(200).json(user)
  } catch (error: any) {
    error.message = MESSAGES.USER_UPDATE_FAILED_MSG
    next(error)
  }
}

// DELETE USER
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.params.id)
    const deleted = await userService.deleteUser(userId)
    if (!deleted) {
      return res.status(404).json({
        message: MESSAGES.USER_NOT_FOUND_MSG,
      })
    }
    res.status(200).json({ message: MESSAGES.USER_DELETE_SUCCESS_MSG })
  } catch (error: any) {
    error.message = MESSAGES.USER_DELETE_FAILED_MSG
    next(error)
  }
}
