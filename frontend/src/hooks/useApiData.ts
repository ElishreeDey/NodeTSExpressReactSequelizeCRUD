/*
 ****************************************************************************************************************************
 * Filename    : useApiData
 * Description : Reusable custom hook for CRUD operations using API endpoints
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

import { useEffect, useState, useCallback } from 'react'

import { userService } from '../services'

import type { EntryDataBase } from '../types'

// enabled defaults to true; pass false to skip the initial fetch (e.g. while auth is in progress)
export default function useApiData<T extends EntryDataBase>(endpoint: string, enabled = true) {
  // Store API response data
  const [data, setData] = useState<T[]>([])

  // Store loading state
  const [loading, setLoading] = useState<boolean>(false)

  // Store API error message
  const [error, setError] = useState<string | null>(null)

  // Fetch all records — delegates to userService so the hook owns only state logic
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await userService.getAll()

      setData(res.data as T[])
    } catch (err) {
      console.error(err)
      setError('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  // Create new record
  const createItem = useCallback(
    async (item: T) => {
      try {
        const res = await userService.create(item)

        setData((prev) => [...prev, res.data as T])

        return res.data
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    [endpoint]
  )

  // Update existing record
  const updateItem = useCallback(
    async (id: number, item: T) => {
      try {
        const res = await userService.update(id, item)

        setData((prev) => prev.map((d) => (d.id === id ? (res.data as T) : d)))

        return res.data
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    [endpoint]
  )

  // Delete existing record
  const deleteItem = useCallback(
    async (id: number) => {
      try {
        await userService.remove(id)

        setData((prev) => prev.filter((d) => d.id !== id))
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    [endpoint]
  )

  // Fetch only after auth completes — prevents a 401 on first load before the cookie is set
  useEffect(() => {
    if (enabled) fetchData()
  }, [fetchData, enabled])

  return {
    data,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    refresh: fetchData,
  }
}
