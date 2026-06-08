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
import cookieParser from 'cookie-parser' // Parses Cookie header so req.cookies is available

/* Import Project Files */
import sequelize from './config' // Sequelize database connection setup
import userRoutes from './routes' // User CRUD route
import { errorMiddleware, apiRateLimiter } from './middleware'
import { MESSAGES } from './constants'

// config .env values
dotenv.config()

// Fail if any required environment variables are missing.
const REQUIRED_ENV_VARS = [
  'JWT_SECRET',
  'CLIENT_URL',
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
]
const missingVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key])
if (missingVars.length > 0) {
  console.error(
    `${MESSAGES.MISSING_REQUIRED_ENV_MSG} ${missingVars.join(', ')}`
  )
  process.exit(1)
}

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

// Parses Cookie header on every request so req.cookies is available in controllers and middleware
app.use(cookieParser())

// Converts incoming JSON request body into JS object. Required for POST and PUT APIs.
// limit:'10kb' prevents huge payloads to crash the server.
app.use(express.json({ limit: '10kb' }))

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
    const server = app.listen(PORT, () => {
      console.log(`${MESSAGES.SERVER_RUNNING_ONPORT_MSG} ${PORT}`)
    })

    // Graceful shutdown — finish active requests and close DB before exiting.
    // SIGTERM is sent by docker stop, pm2 restart, cloud deploys.
    // SIGINT is sent by Ctrl+C in local dev.
    const shutdown = () => {
      server.close(() => {
        sequelize.close()
        process.exit(0)
      })
    }
    process.on('SIGTERM', shutdown)
    process.on('SIGINT', shutdown)
  })
  .catch((error) => {
    // Handle DB connection/sync errors
    console.error(error)
  })
