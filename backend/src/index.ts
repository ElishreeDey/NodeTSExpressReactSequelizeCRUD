/*
 ****************************************************************************************************************************
 * Filename    : index
 * Description : Application starting point
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-25
 ****************************************************************************************************************************
 */

/* Import Required Packages */
import express from 'express' // Express framework used to create backend server and APIs
import dotenv from 'dotenv' // Reads environment variables from .env file
import helmet from 'helmet' // Adds security headers to protect Express app
import cors from 'cors' // Allows frontend apps to access backend APIs
import morgan from 'morgan' // HTTP request logger — logs method, URL, status, response time

/* Import Project Files */
import sequelize from './config/db' // Sequelize database connection setup
import userRoutes from './routes/userRoutes' // User CRUD route
import { errorMiddleware } from './middleware/errorMiddleware'
import { apiRateLimiter } from './middleware/rateLimitMiddleware'

import { MESSAGES } from './constants/messages'

// config .env values
dotenv.config()

// Create Express server instance
const app = express()

// Helmet Security Middleware. Protects app using secure HTTP headers
app.use(helmet())

// CORS Middleware
//app.use(cors()) //Allow ALL origins

// CORS Middleware
app.use(
  cors({
    // Allowed Frontend URL to access the backend.
    origin: process.env.CLIENT_URL,

    // Allowed HTTP Methods
    methods: ['GET', 'POST', 'PUT', 'DELETE'],

    // Allow Credentials
    credentials: true,
  })
)

// Converts incoming JSON request body into JS object. Required for POST and PUT APIs
app.use(express.json())

// Morgan HTTP Request Logger. Logs every incoming request with method, URL, status and response time
app.use(morgan('dev'))

// Rate Limiter Middleware should be added immediately after JSON parser and before routes so abusive requests are blocked early.
app.use(apiRateLimiter)

// Mount routes with /api prefix
app.use('/api', userRoutes)

// Error Middleware. errorMiddleware must be LAST app.use()
app.use(errorMiddleware)

// Read port from .env if not available use default 3000
const PORT = process.env.PORT || 3000

// Sync Sequelize models with PostgreSQL Database Connection. Creates tables automatically if missing
sequelize
  .sync()
  .then(() => {
    console.log(MESSAGES.DB_CON_SUCCESS_MSG)

    // Start Express server after DB connection
    app.listen(PORT, () => {
      console.log(`${MESSAGES.SERVER_RUNNING_ONPORT_MSG} ${PORT}`)
    })
  })
  .catch((error) => {
    // Handle DB connection/sync errors
    console.log(error)
  })
