/*
 ****************************************************************************************************************************
 * Filename    : useUsers
 * Description : Custom hook to manage user data, edit flow and localStorage operations
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-01
 ****************************************************************************************************************************
 */

import { useState, useEffect } from 'react'

import type { EntryDataBase } from '../types'

import {
  getUsersFromStorage,
  saveUsersToStorage,
} from '../services/userService'

export default function useUsers() {
  const [tableData, setTableData] = useState<EntryDataBase[]>([])

  /*Which row is currently editing.*/
  const [editIndex, setEditIndex] = useState<number | null>(null)

  /*Take the edit row complete data.*/
  const [editUser, setEditUser] = useState<EntryDataBase | null>(null)

  /* Row Highlight State */
  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  /*Load saved data from localStorage.*/
  useEffect(() => {
    const storedData = getUsersFromStorage()
    setTableData(storedData)
  }, [])

  /* Which row to delete */
  const handleDelete = (index: number) => {
    const updatedData = tableData.filter((_, i) => i !== index)

    setTableData(updatedData)
    saveUsersToStorage(updatedData)
  }

  /* Which row to edit */
  const handleEdit = (index: number) => {
    const selectedUser = tableData[index]

    setEditIndex(index)
    setEditUser(selectedUser)
    setSelectedRow(index)
  }

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
