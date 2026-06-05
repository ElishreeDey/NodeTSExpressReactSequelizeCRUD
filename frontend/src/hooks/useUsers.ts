/*
 ****************************************************************************************************************************
 * Filename    : useUsers
 * Description : Custom hook to manage user data, edit flow and API operations
 ****************************************************************************************************************************
 */

import { useState, useCallback } from 'react'

//import { toast } from 'react-toastify'

import type { EntryDataBase } from '../types'

import { useApiData } from '../hooks'
//import { TOAST_MSG } from '../constants'

export default function useUsers() {
  const {
    data: tableData,
    loading,
    createItem,
    updateItem,
    deleteItem,
    refresh,
  } = useApiData<EntryDataBase>('users')

  const [editIndex, setEditIndex] = useState<number | null>(null)

  const [editUser, setEditUser] = useState<EntryDataBase | null>(null)

  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  const resetFormState = () => {
    setEditIndex(null)
    setEditUser(null)
    setSelectedRow(null)
  }

  const handleDelete = useCallback(
    async (index: number) => {
      try {
        const selectedUser = tableData[index]

        if (!selectedUser) return

        //console.log('Deleting User ID:', selectedUser.id)

        await deleteItem(selectedUser.id)

        resetFormState()

        await refresh()
      } catch (error) {
        console.error('Delete failed:', error)
      }
    },
    [tableData, deleteItem, refresh]
  )

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
    loading,

    createItem,
    updateItem,
    refresh,

    editIndex,
    setEditIndex,
    editUser,
    selectedRow,
    setSelectedRow,
    handleDelete,
    handleEdit,
  }
}
