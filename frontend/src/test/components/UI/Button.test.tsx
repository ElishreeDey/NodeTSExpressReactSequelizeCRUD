/*
 ****************************************************************************************************************************
 * Filename    : Button.test.tsx
 * Description : Unit test cases for Button UI component
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import Button from '../../../components/UI/Button/Button'

describe('Button Component', () => {
  // Verify children text renders
  it('renders children text', () => {
    render(<Button>Click Me</Button>)

    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument()
  })

  // Verify default type is button
  it('defaults to type button', () => {
    render(<Button>Submit</Button>)

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  // Verify submit type is applied
  it('renders with type submit', () => {
    render(<Button type="submit">Submit</Button>)

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  // Verify reset type is applied
  it('renders with type reset', () => {
    render(<Button type="reset">Reset</Button>)

    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset')
  })

  // Verify onClick fires on click
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Click Me</Button>)

    fireEvent.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  // Verify onClick is not called when not clicked
  it('does not call onClick when not clicked', () => {
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Click Me</Button>)

    expect(handleClick).not.toHaveBeenCalled()
  })

  // Verify button renders without onClick prop
  it('renders without onClick prop', () => {
    render(<Button>No Handler</Button>)

    expect(
      screen.getByRole('button', { name: /no handler/i })
    ).toBeInTheDocument()
  })
})
