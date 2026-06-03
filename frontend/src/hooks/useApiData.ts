import { useEffect, useState, useCallback, useMemo } from 'react'
import axios from 'axios'

export default function useApiData<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // base URL from env variable
  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  // token (reads fresh value each render)
  const token = localStorage.getItem('token')

  // stable axios config
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    }
  }, [token])

  // GET ALL
  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await axios.get<T[]>(`${BASE_URL}/${endpoint}`, config)

      setData(res.data)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }, [BASE_URL, endpoint, config])

  // CREATE
  const createItem = useCallback(
    async (item: T) => {
      try {
        const res = await axios.post<T>(`${BASE_URL}/${endpoint}`, item, config)

        setData((prev) => [...prev, res.data])
        return res.data
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    [BASE_URL, endpoint, config]
  )

  // UPDATE
  const updateItem = useCallback(
    async (id: number, item: T) => {
      try {
        const res = await axios.put<T>(
          `${BASE_URL}/${endpoint}/${id}`,
          item,
          config
        )

        setData((prev) => prev.map((d: any) => (d.id === id ? res.data : d)))

        return res.data
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    [BASE_URL, endpoint, config]
  )

  // DELETE
  const deleteItem = useCallback(
    async (id: number) => {
      try {
        await axios.delete(`${BASE_URL}/${endpoint}/${id}`, config)

        setData((prev) => prev.filter((d: any) => d.id !== id))
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    [BASE_URL, endpoint, config]
  )

  // INITIAL LOAD
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
