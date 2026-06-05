/*
 ****************************************************************************************************************************
 * Filename    : useApiData.test.ts
 * Description : Unit test cases for useApiData custom hook
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

import { renderHook, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import useApiData from '../../hooks/useApiData'
import api from '../../services/api'

// Mock axios instance methods
vi.mock('../../services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('useApiData Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Verify GET request loads data
  it('fetches data successfully', async () => {
    const mockData = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@test.com',
        phone: '9876543210',
        gender: 'male',
      },
    ]

    vi.mocked(api.get).mockResolvedValue({
      data: mockData,
    })

    const { result } = renderHook(() => useApiData<any>('users'))

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData)
    })

    expect(api.get).toHaveBeenCalledWith('/users')
  })

  // Verify loading state completes
  it('sets loading to false after fetch', async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: [],
    })

    const { result } = renderHook(() => useApiData<any>('users'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
  })

  // Verify error state on GET failure
  it('sets error when fetch fails', async () => {
    vi.mocked(api.get).mockRejectedValue(new Error('API Error'))

    const { result } = renderHook(() => useApiData<any>('users'))

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to fetch data')
    })
  })

  // Verify createItem calls POST API
  it('creates item successfully', async () => {
    const newUser = {
      id: 2,
      name: 'Jane Doe',
    }

    vi.mocked(api.get).mockResolvedValue({
      data: [],
    })

    vi.mocked(api.post).mockResolvedValue({
      data: newUser,
    })

    const { result } = renderHook(() => useApiData<any>('users'))

    let response

    await act(async () => {
      response = await result.current.createItem(newUser)
    })

    expect(api.post).toHaveBeenCalledWith('/users', newUser)

    expect(response).toEqual(newUser)
  })

  // Verify updateItem calls PUT API
  it('updates item successfully', async () => {
    const updatedUser = {
      id: 1,
      name: 'Updated User',
    }

    vi.mocked(api.get).mockResolvedValue({
      data: [],
    })

    vi.mocked(api.put).mockResolvedValue({
      data: updatedUser,
    })

    const { result } = renderHook(() => useApiData<any>('users'))

    let response

    await act(async () => {
      response = await result.current.updateItem(1, updatedUser)
    })

    expect(api.put).toHaveBeenCalledWith('/users/1', updatedUser)

    expect(response).toEqual(updatedUser)
  })

  // Verify deleteItem calls DELETE API
  it('deletes item successfully', async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: [],
    })

    vi.mocked(api.delete).mockResolvedValue({})

    const { result } = renderHook(() => useApiData<any>('users'))

    await act(async () => {
      await result.current.deleteItem(1)
    })

    expect(api.delete).toHaveBeenCalledWith('/users/1')
  })
})
