import { useEffect, useState, useCallback } from 'react'

import api from '../services/api'

export default function useApiData<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  /* GET ALL */
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await api.get<T[]>(`/${endpoint}`)

      setData(res.data)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  /* CREATE */
  const createItem = useCallback(
    async (item: T) => {
      try {
        const res = await api.post<T>(`/${endpoint}`, item)

        setData((prev) => [...prev, res.data])

        return res.data
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    [endpoint]
  )

  /* UPDATE */
  const updateItem = useCallback(
    async (id: number, item: T) => {
      try {
        const res = await api.put<T>(`/${endpoint}/${id}`, item)

        setData((prev) => prev.map((d: any) => (d.id === id ? res.data : d)))

        return res.data
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    [endpoint]
  )

  /* DELETE */
  const deleteItem = useCallback(
    async (id: number) => {
      try {
        await api.delete(`/${endpoint}/${id}`)

        setData((prev) => prev.filter((d: any) => d.id !== id))
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    [endpoint]
  )

  /* INITIAL LOAD */
  useEffect(() => {
    fetchData()
  }, [fetchData])

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
