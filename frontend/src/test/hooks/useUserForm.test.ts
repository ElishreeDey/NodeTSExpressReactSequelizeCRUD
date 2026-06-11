/*
 ****************************************************************************************************************************
 * Filename    : useUserForm.test.ts
 * Description : Unit test cases for useUserForm custom hook
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { FormEvent } from 'react'

import useUserForm from '../../hooks/useUserForm'
import { VALIDATION_MSG, USER_MESSAGES } from '../../constants'
import type { EntryDataBase } from '../../types'

// Mock toast
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

import { toast } from 'react-toastify'

// Reusable mock props factory
const buildProps = (overrides = {}) => ({
  tableData: [],
  createItem: vi.fn().mockResolvedValue({}),
  updateItem: vi.fn().mockResolvedValue({}),
  refresh: vi.fn().mockResolvedValue(undefined),
  editIndex: null,
  setEditIndex: vi.fn(),
  editUser: null,
  setSelectedRow: vi.fn(),
  ...overrides,
})

// Helper to create a mock submit event
const mockSubmitEvent = () =>
  ({ preventDefault: vi.fn() }) as unknown as FormEvent<HTMLFormElement>

// Sample edit user
const sampleUser: EntryDataBase = {
  id: 1,
  name: 'John Doe',
  email: 'john@test.com',
  phone: '123-456-7890',
  gender: 'Male',
}

describe('useUserForm Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Verify form starts with empty values
  it('initializes formData with empty fields', () => {
    const { result } = renderHook(() => useUserForm(buildProps()))

    expect(result.current.formData.name).toBe('')
    expect(result.current.formData.email).toBe('')
    expect(result.current.formData.phone).toBe('')
    expect(result.current.formData.gender).toBe('')
  })

  // Verify mandatory markers start as asterisk
  it('initializes mandatory markers as asterisk', () => {
    const { result } = renderHook(() => useUserForm(buildProps()))

    expect(result.current.formData.mandatoryName).toBe('*')
    expect(result.current.formData.mandatoryEmail).toBe('*')
    expect(result.current.formData.mandatoryPhone).toBe('*')
  })

  // Verify handleChange updates a field value
  it('updates formData field on handleChange', () => {
    const { result } = renderHook(() => useUserForm(buildProps()))

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Alice' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.formData.name).toBe('Alice')
  })

  // Verify handleChange updates email field
  it('updates email field on handleChange', () => {
    const { result } = renderHook(() => useUserForm(buildProps()))

    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'alice@test.com' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.formData.email).toBe('alice@test.com')
  })

  // Verify name blur with empty value keeps asterisk
  it('keeps mandatoryName as asterisk when name is empty on blur', () => {
    const { result } = renderHook(() => useUserForm(buildProps()))

    act(() => {
      result.current.handleBlur({
        target: { name: 'name', value: '' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.formData.mandatoryName).toBe('*')
  })

  // Verify name blur with valid value clears mandatory marker
  it('clears mandatoryName when valid name is entered', () => {
    const { result } = renderHook(() => useUserForm(buildProps()))

    act(() => {
      result.current.handleBlur({
        target: { name: 'name', value: 'Alice' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.formData.mandatoryName).toBe('')
  })

  // Verify email blur with invalid value shows error
  it('sets mandatoryEmail error on invalid email blur', () => {
    const { result } = renderHook(() => useUserForm(buildProps()))

    act(() => {
      result.current.handleBlur({
        target: { name: 'email', value: 'not-an-email' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.formData.mandatoryEmail).toBe(
      VALIDATION_MSG.invalidEmail
    )
  })

  // Verify email blur with valid value clears mandatory marker
  it('clears mandatoryEmail when valid email is entered', () => {
    const { result } = renderHook(() => useUserForm(buildProps()))

    act(() => {
      result.current.handleBlur({
        target: { name: 'email', value: 'alice@test.com' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.formData.mandatoryEmail).toBe('')
  })

  // Verify email blur with empty value keeps asterisk
  it('keeps mandatoryEmail as asterisk when email is empty on blur', () => {
    const { result } = renderHook(() => useUserForm(buildProps()))

    act(() => {
      result.current.handleBlur({
        target: { name: 'email', value: '' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.formData.mandatoryEmail).toBe('*')
  })

  // Verify phone blur with valid 10 digits formats the phone
  it('formats phone to xxx-xxx-xxxx on valid input blur', () => {
    const { result } = renderHook(() => useUserForm(buildProps()))

    act(() => {
      result.current.handleBlur({
        target: { name: 'phone', value: '1234567890' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.formData.phone).toBe('123-456-7890')
    expect(result.current.formData.mandatoryPhone).toBe('')
  })

  // Verify phone blur with invalid value shows error
  it('sets mandatoryPhone error on invalid phone blur', () => {
    const { result } = renderHook(() => useUserForm(buildProps()))

    act(() => {
      result.current.handleBlur({
        target: { name: 'phone', value: '123' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.formData.mandatoryPhone).toBe(
      VALIDATION_MSG.invalidPhone
    )
  })

  // Verify handleSubmit does not call API when name is empty
  it('does not call createItem when name is empty on submit', async () => {
    const props = buildProps()

    const { result } = renderHook(() => useUserForm(props))

    await act(async () => {
      await result.current.handleSubmit(mockSubmitEvent())
    })

    expect(props.createItem).not.toHaveBeenCalled()
  })

  // Verify handleSubmit calls createItem with valid data in create mode
  it('calls createItem with valid form data', async () => {
    const props = buildProps()

    const { result } = renderHook(() => useUserForm(props))

    // Fill valid data
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Alice' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'email', value: 'alice@test.com' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'phone', value: '1234567890' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'gender', value: 'female' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    await act(async () => {
      await result.current.handleSubmit(mockSubmitEvent())
    })

    expect(props.createItem).toHaveBeenCalled()
  })

  // Verify toast.success shows save message on create
  it('shows save success toast on successful create', async () => {
    const props = buildProps()

    const { result } = renderHook(() => useUserForm(props))

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Alice' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'email', value: 'alice@test.com' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'phone', value: '1234567890' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    await act(async () => {
      await result.current.handleSubmit(mockSubmitEvent())
    })

    expect(toast.success).toHaveBeenCalledWith(
      USER_MESSAGES.saveSuccess,
      expect.any(Object)
    )
  })

  // Verify handleSubmit calls updateItem in edit mode
  it('calls updateItem with correct data in edit mode', async () => {
    const props = buildProps({ editUser: sampleUser })

    const { result } = renderHook(() => useUserForm(props))

    // Update a field
    act(() => {
      result.current.handleChange({
        target: { name: 'phone', value: '9876543210' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    await act(async () => {
      await result.current.handleSubmit(mockSubmitEvent())
    })

    expect(props.updateItem).toHaveBeenCalledWith(
      sampleUser.id,
      expect.objectContaining({ id: sampleUser.id })
    )
  })

  // Verify toast.success shows edit message on update
  it('shows edit success toast on successful update', async () => {
    const props = buildProps({ editUser: sampleUser })

    const { result } = renderHook(() => useUserForm(props))

    await act(async () => {
      await result.current.handleSubmit(mockSubmitEvent())
    })

    expect(toast.success).toHaveBeenCalledWith(
      USER_MESSAGES.editSuccess,
      expect.any(Object)
    )
  })

  // Verify form is reset after successful create
  it('resets form after successful create', async () => {
    const props = buildProps()

    const { result } = renderHook(() => useUserForm(props))

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Alice' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'email', value: 'alice@test.com' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'phone', value: '1234567890' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    await act(async () => {
      await result.current.handleSubmit(mockSubmitEvent())
    })

    expect(result.current.formData.name).toBe('')
    expect(result.current.formData.email).toBe('')
  })

  // Verify editUser data populates the form
  it('populates form fields when editUser is provided', () => {
    const { result } = renderHook(() =>
      useUserForm(buildProps({ editUser: sampleUser }))
    )

    expect(result.current.formData.name).toBe(sampleUser.name)
    expect(result.current.formData.email).toBe(sampleUser.email)
    expect(result.current.formData.phone).toBe(sampleUser.phone)
    expect(result.current.formData.gender).toBe(sampleUser.gender)
  })

  // Verify form resets when editUser becomes null
  it('resets form when editUser is null', () => {
    const { result, rerender } = renderHook(
      ({ editUser }: { editUser: EntryDataBase | null }) =>
        useUserForm(buildProps({ editUser })),
      { initialProps: { editUser: sampleUser as EntryDataBase | null } }
    )

    expect(result.current.formData.name).toBe(sampleUser.name)

    rerender({ editUser: null })

    expect(result.current.formData.name).toBe('')
  })
})
