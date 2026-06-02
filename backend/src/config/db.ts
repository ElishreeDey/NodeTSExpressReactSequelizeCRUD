/*
 ****************************************************************************************************************************
 * Filename    : db.ts
 * Description : This file is for setting up and managing the database connection.
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-25
 ****************************************************************************************************************************
 */

import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

import { MESSAGES } from '../constants/messages'

dotenv.config()

// Read Environment Variables
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Validate Environment Variables
if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  throw new Error(MESSAGES.MISSING_EVN_VARIABLE_MSG)
}

// Create Sequelize Instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  port: Number(DB_PORT),
  logging: false,

  // Connection Pool
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})

// Export Sequelize Instance
export default sequelize
