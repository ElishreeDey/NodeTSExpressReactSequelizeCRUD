/*
 ****************************************************************************************************************************
 * Filename    : userModel
 * Description : What table to use, What columns exist, What datatype each column has, Field validations if any.
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-25
 ****************************************************************************************************************************
 */

// Import Required Sequelize Modules
import { DataTypes, Model } from 'sequelize'

// Database connection instance
import sequelize from '../config/db'

// TypeScript interface for User fields
import { UserAttributes } from '../types/userTypes'

/* Create User Model Class. This class maps to PostgreSQL table: users*/
class User extends Model<UserAttributes> implements UserAttributes {
  // Table columns
  public id!: number
  public name!: string
  public email!: string
  public phone!: string
  public gender!: string
}

// Initialize Sequelize Model User.init() Defines table columns and settings
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },

  {
    // Database connection object
    sequelize,

    // Sequelize internal model name
    modelName: 'User',

    // Actual PostgreSQL table name
    tableName: 'users',

    // Automatically add createdAt and updatedAt
    timestamps: true,
  }
)

export default User
