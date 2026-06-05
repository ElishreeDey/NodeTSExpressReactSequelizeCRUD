/*
 ****************************************************************************************************************************
 * Filename    : Input.test.tsx
 * Description : Unit test cases for Input UI component
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import Input from '../../../components/UI/Input/Input'

// Base props used across tests
const baseProps = {
  type: 'text',
  id: 'name',
  name: 'name',
  value: '',
  onChange: vi.fn(),
}

describe('Input Component', () => {
  // Verify correct input type is rendered
  it('renders with correct type attribute', () => {
    render(<Input {...baseProps} type="email" />)

    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
  })

  // Verify id attribute is applied
  it('renders with correct id', () => {
    render(<Input {...baseProps} id="email-field" />)

    expect(document.getElementById('email-field')).toBeInTheDocument()
  })

  // Verify name attribute is applied
  it('renders with correct name attribute', () => {
    render(<Input {...baseProps} name="email" />)

    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'email')
  })

  // Verify value is rendered
  it('renders with correct value', () => {
    render(<Input {...baseProps} value="John Doe" />)

    expect(screen.getByRole('textbox')).toHaveValue('John Doe')
  })

  // Verify required is set when prop is true
  it('renders as required when required prop is true', () => {
    render(<Input {...baseProps} required={true} />)

    expect(screen.getByRole('textbox')).toBeRequired()
  })

  // Verify required is not set by default
  it('is not required by default', () => {
    render(<Input {...baseProps} />)

    expect(screen.getByRole('textbox')).not.toBeRequired()
  })

  // Verify onChange fires when value changes
  it('calls onChange when value changes', () => {
    const handleChange = vi.fn()

    render(<Input {...baseProps} onChange={handleChange} />)

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  // Verify onBlur fires when field loses focus
  it('calls onBlur when field loses focus', () => {
    const handleBlur = vi.fn()

    render(<Input {...baseProps} onBlur={handleBlur} />)

    fireEvent.blur(screen.getByRole('textbox'))

    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  // Verify onBlur is optional
  it('renders without onBlur prop', () => {
    render(<Input {...baseProps} />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
