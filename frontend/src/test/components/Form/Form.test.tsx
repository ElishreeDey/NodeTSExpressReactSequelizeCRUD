/*
 ****************************************************************************************************************************
 * Filename    : Form.test.tsx
 * Description : Unit test cases for Registration Form component
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import RenderForm from '../../../components/Form/Form'

// Mock useUserForm hook
vi.mock('../../hooks', () => ({
  useUserForm: () => ({
    formData: {
      name: '',
      email: '',
      phone: '',
      gender: '',
      mandatoryName: '',
      mandatoryEmail: '',
      mandatoryPhone: '',
    },
    handleChange: vi.fn(),
    handleBlur: vi.fn(),
    handleSubmit: vi.fn(),
  }),
}))

// Mock component props
const mockProps = {
  tableData: [],
  createItem: vi.fn(),
  updateItem: vi.fn(),
  refresh: vi.fn(),
  editIndex: null,
  setEditIndex: vi.fn(),
  editUser: null,
  setSelectedRow: vi.fn(),
}

describe('RenderForm Component', () => {
  // Verify form fields render
  it('renders all form fields', () => {
    render(<RenderForm {...mockProps} />)

    expect(screen.getByLabelText(/First name/i)).toBeInTheDocument()

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()

    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument()

    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument()
  })

  // Verify submit button in create mode
  it('shows submit button in create mode', () => {
    render(<RenderForm {...mockProps} />)

    expect(
      screen.getByRole('button', {
        name: /submit/i,
      })
    ).toBeInTheDocument()
  })

  // Verify save button in edit mode
  it('shows save changes button in edit mode', () => {
    render(<RenderForm {...mockProps} editIndex={1} />)

    expect(
      screen.getByRole('button', {
        name: /save changes/i,
      })
    ).toBeInTheDocument()
  })

  // Verify name field is mandatory
  it('name field is required', () => {
    render(<RenderForm {...mockProps} />)

    expect(screen.getByLabelText(/First name/i)).toBeRequired()
  })

  // Verify email field is mandatory
  it('email field is required', () => {
    render(<RenderForm {...mockProps} />)

    expect(screen.getByLabelText(/Email/i)).toBeRequired()
  })

  // Verify phone field is mandatory
  it('phone field is required', () => {
    render(<RenderForm {...mockProps} />)

    expect(screen.getByLabelText(/Phone/i)).toBeRequired()
  })

  // Verify gender field is optional
  it('gender field is optional', () => {
    render(<RenderForm {...mockProps} />)

    expect(screen.getByLabelText(/Gender/i)).not.toBeRequired()
  })
})
