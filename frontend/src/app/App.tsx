import React from 'react'

import { RenderForm, RenderTable } from '../components'

import { useUsers } from '../hooks'

// These imports are for Toastify pop-ups
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  const {
    tableData,
    setTableData,
    editIndex,
    setEditIndex,
    editUser,
    selectedRow,
    setSelectedRow,
    handleDelete,
    handleEdit,
  } = useUsers()

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

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
