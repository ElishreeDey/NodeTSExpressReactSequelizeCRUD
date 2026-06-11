/*
 ****************************************************************************************************************************
 * Filename    : useUsers.test.ts
 * Description : Unit test cases for useUsers custom hook
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import useUsers from '../../hooks/useUsers'
import { useApiData } from '../../hooks'

// Mock the hooks barrel so useApiData used inside useUsers is intercepted
vi.mock('../../hooks', () => ({
  useApiData: vi.fn(),
}))

// Sample user data
const mockTableData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@test.com',
    phone: '123-456-7890',
    gender: 'Male' as const,
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@test.com',
    phone: '098-765-4321',
    gender: 'Female' as const,
  },
]

const mockDeleteItem = vi.fn()
const mockRefresh = vi.fn()
const mockCreateItem = vi.fn()
const mockUpdateItem = vi.fn()

describe('useUsers Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useApiData).mockReturnValue({
      data: mockTableData,
      loading: false,
      error: null,
      createItem: mockCreateItem,
      updateItem: mockUpdateItem,
      deleteItem: mockDeleteItem,
      refresh: mockRefresh,
    })
  })

  // Verify initial state values are null
  it('initializes editIndex as null', () => {
    const { result } = renderHook(() => useUsers())

    expect(result.current.editIndex).toBeNull()
  })

  // Verify editUser starts as null
  it('initializes editUser as null', () => {
    const { result } = renderHook(() => useUsers())

    expect(result.current.editUser).toBeNull()
  })

  // Verify selectedRow starts as null
  it('initializes selectedRow as null', () => {
    const { result } = renderHook(() => useUsers())

    expect(result.current.selectedRow).toBeNull()
  })

  // Verify table data comes from useApiData
  it('returns tableData from useApiData', () => {
    const { result } = renderHook(() => useUsers())

    expect(result.current.tableData).toEqual(mockTableData)
  })

  // Verify handleEdit sets editIndex to clicked index
  it('sets editIndex when handleEdit is called', () => {
    const { result } = renderHook(() => useUsers())

    act(() => {
      result.current.handleEdit(0)
    })

    expect(result.current.editIndex).toBe(0)
  })

  // Verify handleEdit sets editUser to the correct user
  it('sets editUser to the user at given index', () => {
    const { result } = renderHook(() => useUsers())

    act(() => {
      result.current.handleEdit(1)
    })

    expect(result.current.editUser).toEqual(mockTableData[1])
  })

  // Verify handleEdit sets selectedRow to clicked index
  it('sets selectedRow when handleEdit is called', () => {
    const { result } = renderHook(() => useUsers())

    act(() => {
      result.current.handleEdit(0)
    })

    expect(result.current.selectedRow).toBe(0)
  })

  // Verify handleDelete calls deleteItem with user id
  it('calls deleteItem with the correct user id', async () => {
    mockDeleteItem.mockResolvedValue(undefined)
    mockRefresh.mockResolvedValue(undefined)

    const { result } = renderHook(() => useUsers())

    await act(async () => {
      await result.current.handleDelete(0)
    })

    expect(mockDeleteItem).toHaveBeenCalledWith(1)
  })

  // Verify handleDelete calls refresh after delete
  it('calls refresh after deleteItem completes', async () => {
    mockDeleteItem.mockResolvedValue(undefined)
    mockRefresh.mockResolvedValue(undefined)

    const { result } = renderHook(() => useUsers())

    await act(async () => {
      await result.current.handleDelete(0)
    })

    expect(mockRefresh).toHaveBeenCalled()
  })

  // Verify handleDelete resets editIndex to null
  it('resets editIndex to null after delete', async () => {
    mockDeleteItem.mockResolvedValue(undefined)
    mockRefresh.mockResolvedValue(undefined)

    const { result } = renderHook(() => useUsers())

    act(() => {
      result.current.handleEdit(0)
    })

    await act(async () => {
      await result.current.handleDelete(0)
    })

    expect(result.current.editIndex).toBeNull()
  })

  // Verify handleDelete resets selectedRow to null
  it('resets selectedRow to null after delete', async () => {
    mockDeleteItem.mockResolvedValue(undefined)
    mockRefresh.mockResolvedValue(undefined)

    const { result } = renderHook(() => useUsers())

    act(() => {
      result.current.handleEdit(0)
    })

    await act(async () => {
      await result.current.handleDelete(0)
    })

    expect(result.current.selectedRow).toBeNull()
  })

  // Verify handleDelete does nothing when user not found
  it('does nothing when user at index does not exist', async () => {
    const { result } = renderHook(() => useUsers())

    await act(async () => {
      await result.current.handleDelete(99)
    })

    expect(mockDeleteItem).not.toHaveBeenCalled()
  })
})
