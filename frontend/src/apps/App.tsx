import React, { useState, useEffect } from 'react'

import RenderForm from '../components/Form'
import RenderTable from '../components/Table'

import type { EntryDataBase } from '../types/type'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  const [tableData, setTableData] = useState<EntryDataBase[]>([])

  /*Which row is currently editing.*/
  const [editIndex, setEditIndex] = useState<number | null>(null)

  /*Take the edit row complete data.*/
  const [editUser, setEditUser] = useState<EntryDataBase | null>(null)

  /* Row Highlight State */
  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  /*Load saved data from localStorage.*/
  useEffect(() => {
    const storedData = localStorage.getItem('setLocalStorageJSON')

    if (storedData) {
      setTableData(JSON.parse(storedData))
    }
  }, [])

  /* Which row to delete */
  const handleDelete = (index: number) => {
    const updatedData = tableData.filter((_, i) => i !== index)
    setTableData(updatedData)
    localStorage.setItem('setLocalStorageJSON', JSON.stringify(updatedData))
  }

  /* Which row to edit */
  const handleEdit = (index: number) => {
    const selectedUser = tableData[index]
    setEditIndex(index)
    setEditUser(selectedUser)
    setSelectedRow(index) /* Highlight Row */
  }

  return (
    <>
    
    <ToastContainer
      position="top-right"
      autoClose={3000}
    />

    <div className="pageContainer">
      <RenderForm
        tableData={tableData}
        setTableData={setTableData}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
        editUser={editUser}
        setSelectedRow={setSelectedRow}
      />

      <RenderTable
        tableData={tableData}
        onDelete={handleDelete}
        onEdit={handleEdit}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
      />
    </div>

    </>    
  )
}
