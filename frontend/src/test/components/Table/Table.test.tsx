/*
 ****************************************************************************************************************************
 * Filename    : Table.test.tsx
 * Description : Unit test cases for Registered Data Table component
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-04
 ****************************************************************************************************************************
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import RenderTable from '../../../components/Table/Table'

// Mock ConfirmModal component
vi.mock('../ConfirmModal/ConfirmModal', () => ({
  default: () => <div>Mock Confirm Modal</div>,
}))

// Mock table data
const mockTableData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@test.com',
    phone: '9876543210',
    gender: 'male',
  },
]

// Mock component props
const mockProps = {
  tableData: mockTableData,
  onDelete: vi.fn(),
  onEdit: vi.fn(),
  selectedRow: null,
  setSelectedRow: vi.fn(),
}

describe('RenderTable Component', () => {
  // Verify table heading renders
  it('renders table heading', () => {
    render(<RenderTable {...mockProps} />)

    expect(screen.getByText(/Registered Data/i)).toBeInTheDocument()
  })

  // Verify column headers render
  it('renders all table headers', () => {
    render(<RenderTable {...mockProps} />)

    expect(screen.getByText(/Name/i)).toBeInTheDocument()
    expect(screen.getByText(/Email/i)).toBeInTheDocument()
    expect(screen.getByText(/Phone/i)).toBeInTheDocument()
    expect(screen.getByText(/Gender/i)).toBeInTheDocument()
    expect(screen.getByText(/Action/i)).toBeInTheDocument()
  })

  // Verify user data renders
  it('renders user data', () => {
    render(<RenderTable {...mockProps} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@test.com')).toBeInTheDocument()
    expect(screen.getByText('9876543210')).toBeInTheDocument()
    expect(screen.getByText('male')).toBeInTheDocument()
  })

  // Verify edit and delete icons render
  it('renders edit and delete icons', () => {
    render(<RenderTable {...mockProps} />)

    expect(screen.getByAltText('Edit')).toBeInTheDocument()
    expect(screen.getByAltText('Delete')).toBeInTheDocument()
  })

  // Verify edit action callback
  it('calls onEdit when edit icon is clicked', () => {
    render(<RenderTable {...mockProps} />)

    const editIcon = screen.getByAltText('Edit')

    fireEvent.click(editIcon)

    expect(mockProps.onEdit).toHaveBeenCalledWith(0)
  })

  // Verify row selection during edit
  it('calls setSelectedRow when edit icon is clicked', () => {
    render(<RenderTable {...mockProps} />)

    const editIcon = screen.getByAltText('Edit')

    fireEvent.click(editIcon)

    expect(mockProps.setSelectedRow).toHaveBeenCalledWith(0)
  })
})
