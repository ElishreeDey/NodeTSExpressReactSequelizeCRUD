/*
 ****************************************************************************************************************************
 * Filename    : useLocalStorage
 * Description : Reusable hook to safely manage localStorage data
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-02
 ****************************************************************************************************************************
 */

import { useState } from 'react'

import { CONSOLE_MSG } from '../constants'

/* Hook */
export default function useLocalStorage<T>(key: string, initialValue: T) {
  /* Load Initial Data */
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)

      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(CONSOLE_MSG.localStorageReadErr, error)
      return initialValue
    }
  })

  /* Save Data */
  const setValue = (value: T) => {
    try {
      setStoredValue(value)

      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(CONSOLE_MSG.localStorageSaveErr, error)
    }
  }

  return {
    storedValue,
    setValue,
  }
}
