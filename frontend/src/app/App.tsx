import { RenderForm, RenderTable } from '../components'
import { useUsers, useAuth } from '../hooks'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  const { isAuthenticating } = useAuth()

  const {
    tableData,
    setTableData,
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
  } = useUsers()

  if (isAuthenticating) {
    return (
      <div className="loadingContainer">
        <p className="loadingText">
          Unable to load application due to authentication failure...
        </p>
      </div>
    )
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="pageContainer">
        <RenderForm
          tableData={tableData}
          setTableData={setTableData}
          createItem={createItem}
          updateItem={updateItem}
          refresh={refresh}
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
