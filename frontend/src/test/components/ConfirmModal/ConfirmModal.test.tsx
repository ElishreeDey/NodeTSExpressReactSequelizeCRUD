/*
 ****************************************************************************************************************************
 * Filename    : ConfirmModal.test.tsx
 * Description : Unit test cases for Confirm Modal component
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import ConfirmModal from '../../../components/ConfirmModal/ConfirmModal'

// Mock component props
const mockProps = {
  isOpen: true,
  title: 'Delete Record',
  message: 'Are you sure you want to delete this record?',
  onConfirm: vi.fn(),
  onCancel: vi.fn(),
}

describe('ConfirmModal Component', () => {
  // Verify modal renders when open
  it('renders modal when isOpen is true', () => {
    render(<ConfirmModal {...mockProps} />)

    expect(screen.getByText('Delete Record')).toBeInTheDocument()

    expect(
      screen.getByText('Are you sure you want to delete this record?')
    ).toBeInTheDocument()
  })

  // Verify modal does not render when closed
  it('does not render modal when isOpen is false', () => {
    render(<ConfirmModal {...mockProps} isOpen={false} />)

    expect(screen.queryByText('Delete Record')).not.toBeInTheDocument()
  })

  // Verify confirm button renders
  it('renders yes button', () => {
    render(<ConfirmModal {...mockProps} />)

    expect(screen.getByRole('button', { name: /yes/i })).toBeInTheDocument()
  })

  // Verify cancel button renders
  it('renders no button', () => {
    render(<ConfirmModal {...mockProps} />)

    expect(screen.getByRole('button', { name: /no/i })).toBeInTheDocument()
  })

  // Verify confirm callback
  it('calls onConfirm when yes button clicked', () => {
    render(<ConfirmModal {...mockProps} />)

    fireEvent.click(screen.getByRole('button', { name: /yes/i }))

    expect(mockProps.onConfirm).toHaveBeenCalled()
  })

  // Verify cancel callback
  it('calls onCancel when no button clicked', () => {
    render(<ConfirmModal {...mockProps} />)

    fireEvent.click(screen.getByRole('button', { name: /no/i }))

    expect(mockProps.onCancel).toHaveBeenCalled()
  })
})
