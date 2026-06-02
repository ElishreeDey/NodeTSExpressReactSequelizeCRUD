/*
 ****************************************************************************************************************************
 * Filename    : useUsers
 * Description : Custom hook to manage user data, edit flow and localStorage operations
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-01
 ****************************************************************************************************************************
 */

import { useState, useCallback } from 'react'

import type { EntryDataBase } from '../types'

import { useLocalStorage } from '../hooks'

export default function useUsers() {
  /* User Data State with localStorage Hook */
  const { storedValue: tableData, setValue: setTableData } = useLocalStorage<
    EntryDataBase[]
  >('setLocalStorageJSON', [])

  /* Which row is currently editing */
  const [editIndex, setEditIndex] = useState<number | null>(null)

  /* Take the edit row complete data */
  const [editUser, setEditUser] = useState<EntryDataBase | null>(null)

  /* Row Highlight State */
  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  /* Which row to delete */
  const handleDelete = useCallback(
    (index: number) => {
      const updatedData = tableData.filter((_, i) => i !== index)

      setTableData(updatedData)
    },
    [tableData, setTableData]
  )

  /* Which row to edit */
  const handleEdit = useCallback(
    (index: number) => {
      const selectedUser = tableData[index]

      setEditIndex(index)
      setEditUser(selectedUser)
      setSelectedRow(index)
    },
    [tableData]
  )

  return {
    tableData,
    setTableData,
    editIndex,
    setEditIndex,
    editUser,
    selectedRow,
    setSelectedRow,
    handleDelete,
    handleEdit,
  }
}
