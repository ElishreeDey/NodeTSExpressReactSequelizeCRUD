/*
 ****************************************************************************************************************************
 * Filename    : setup
 * Description : Global test setup — runs before every test file
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

// Provide JWT_SECRET so authHelper module-level validation does not throw
process.env.JWT_SECRET = 'test-secret-key-for-vitest'
