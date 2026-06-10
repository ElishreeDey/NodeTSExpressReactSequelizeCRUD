/*
 ****************************************************************************************************************************
 * Filename    : db.ts
 * Description : This file is for setting up and managing the database connection.
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-25
 ****************************************************************************************************************************
 */

import { Sequelize } from 'sequelize'

import { keys } from './keys'

// Create Sequelize Instance — keys.ts already validated all DB vars at startup
const sequelize = new Sequelize(keys.db.name, keys.db.user, keys.db.password, {
  host: keys.db.host,
  dialect: 'postgres',
  port: keys.db.port,
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
