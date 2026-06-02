/* Import Express */
import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware'
import { login } from '../controllers/authController'

import {
  createUser, // Create new user
  getUsers, // Get all users
  getUserById, // Get single user by ID
  updateUser, // Update existing user
  deleteUser, // Delete user
} from '../controllers/userController'

/* Create Express Router it helps separate routes from main app file*/
const router = express.Router()

/* Login Route - Generate JWT Token */
router.post('/login', login)

/* Create a new user */
router.post('/users', authMiddleware, createUser)

/* Fetch all users */
router.get('/users', authMiddleware, getUsers)

// Fetch single user using ID
router.get('/users/:id', authMiddleware, getUserById)

//Update single user using ID
router.put('/users/:id', authMiddleware, updateUser)

//Delete single user using ID
router.delete('/users/:id', authMiddleware, deleteUser)

export default router
