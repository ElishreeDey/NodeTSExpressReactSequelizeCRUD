/* Import Express */
import express from 'express'
import { authMiddleware } from '../middleware'
import { login, createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers'

/* Create Express Router it helps separate routes from main app file*/
const router = express.Router()

/* Login Route - Generate JWT Token */
router.post('/login', login)

/* Verify Route - Check if existing cookie token is still valid (used by frontend to skip re-login) */
router.get('/verify', authMiddleware, (_req, res) =>
  res.status(200).json({ valid: true })
)

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
