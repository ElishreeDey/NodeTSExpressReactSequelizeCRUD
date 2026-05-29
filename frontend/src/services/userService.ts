/*
 ****************************************************************************************************************************
 * Filename    : userService
 * Description : This file handles user data storage and retrieval operations using localStorage
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-29
 ****************************************************************************************************************************
 */

import type { EntryDataBase } from '../types'

const STORAGE_KEY = 'setLocalStorageJSON'

/* Get Users from Local Storage */
export const getUsersFromStorage = (): EntryDataBase[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Failed to load data:', error)
    return []
  }
}

/* Save Users to Local Storage */
export const saveUsersToStorage = (
  data: EntryDataBase[]
): void => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    )
  } catch (error) {
    console.error('Failed to save data:', error)
    throw error
  }
}