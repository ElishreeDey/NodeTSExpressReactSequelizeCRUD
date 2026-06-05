/*
 ****************************************************************************************************************************
 * Filename    : Select.test.tsx
 * Description : Unit test cases for Select UI component
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import Select from '../../../components/UI/Select/Select'

// Sample options for tests
const mockOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
]

// Base props used across tests
const baseProps = {
  id: 'gender',
  name: 'gender',
  value: '',
  options: mockOptions,
  onChange: vi.fn(),
}

describe('Select Component', () => {
  // Verify select element renders
  it('renders a select element', () => {
    render(<Select {...baseProps} />)

    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  // Verify id attribute is applied
  it('renders with correct id', () => {
    render(<Select {...baseProps} id="gender-field" />)

    expect(document.getElementById('gender-field')).toBeInTheDocument()
  })

  // Verify name attribute is applied
  it('renders with correct name attribute', () => {
    render(<Select {...baseProps} name="gender" />)

    expect(screen.getByRole('combobox')).toHaveAttribute('name', 'gender')
  })

  // Verify all options are rendered
  it('renders all options from options array', () => {
    render(<Select {...baseProps} />)

    expect(screen.getByRole('option', { name: 'Male' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Female' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Other' })).toBeInTheDocument()
  })

  // Verify option count matches
  it('renders correct number of options', () => {
    render(<Select {...baseProps} />)

    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  // Verify selected value is shown
  it('renders with correct selected value', () => {
    render(<Select {...baseProps} value="female" />)

    expect(screen.getByRole('combobox')).toHaveValue('female')
  })

  // Verify onChange fires when selection changes
  it('calls onChange when a new option is selected', () => {
    const handleChange = vi.fn()

    render(<Select {...baseProps} onChange={handleChange} />)

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'male' },
    })

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  // Verify empty options list renders nothing
  it('renders no options when options array is empty', () => {
    render(<Select {...baseProps} options={[]} />)

    expect(screen.queryAllByRole('option')).toHaveLength(0)
  })
})
