/*
 ****************************************************************************************************************************
 * Filename    : Table
 * Description : This file holds Table design for View Registered Data
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-13
 ****************************************************************************************************************************
 */

import { useState } from 'react'

//import listIcon,editIcon,deleteIcon from images.ts file';
import { editIcon, deleteIcon, listIcon } from '../assets/images'

import ConfirmModal from './ConfirmModal/ConfirmModal'

import type { EntryDataBase } from '../types'

import { deleteConformModal } from '../utils/constants'

/* Props Type */
type TableProps = {
  tableData: EntryDataBase[]
  onDelete: (index: number) => void
  onEdit: (index: number) => void
  selectedRow: number | null
  setSelectedRow: React.Dispatch<React.SetStateAction<number | null>>
}

/* Component */
export default function RenderTable({
  tableData,
  onDelete,
  onEdit,
  selectedRow,
  setSelectedRow,
}: TableProps) {
  /* Modal Open / Close State */
  const [showModal, setShowModal] = useState(false)

  /* Store which row index user wants to delete */
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)

  /* Handler to Confirm Delete when user clicks Yes in confirmation modal:
     1. Delete selected row
     2. Close modal
     3. Clear delete index
     4. Remove row highlight
  */
  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      onDelete(deleteIndex)
    }

    setShowModal(false)
    setDeleteIndex(null)
    setSelectedRow(null)
  }

  /* Handler to Cancel Delete when user clicks Cancel:
     1. Close modal
     2. Clear delete index
     3. Remove row highlight
  */
  const handleCancelDelete = () => {
    setShowModal(false)
    setDeleteIndex(null)
    setSelectedRow(null)
  }

  /* ----------------- table design -------------------- */
  return (
    <div className="tableCard">
      <h1>
        <img src={listIcon} className="icon" alt="List Icon" />
        Registered Data
      </h1>

      {/* Table Wrapper helps manage scroll and responsive table layout*/}
      <div className="tableWrapper">
        <table id="viewData" className="displayRegisteredData">
          <thead>
            <tr>
              <th className="storedDataColHeader"> Name </th>
              <th className="storedDataColHeader"> Email </th>
              <th className="storedDataColHeader"> Phone </th>
              <th className="storedDataColHeader"> Gender </th>
              <th className="storedDataColHeader"> Action </th>
            </tr>
          </thead>

          {/* Table Body - Loop through tableData and render each user row */}
          <tbody>
            {tableData.map((user, index) => {
              /* Check if current row is selected, used to apply row highlight styling */
              const isSelected = selectedRow === index

              return (
                <tr key={index}>
                  <td
                    className={`storedDataCol ${isSelected ? 'highlightRow' : ''}`}
                  >
                    {user.username}
                  </td>

                  <td
                    className={`storedDataCol ${isSelected ? 'highlightRow' : ''}`}
                  >
                    {user.email}
                  </td>

                  <td
                    className={`storedDataCol ${isSelected ? 'highlightRow' : ''}`}
                  >
                    {user.phone}
                  </td>

                  <td
                    className={`storedDataCol ${isSelected ? 'highlightRow' : ''}`}
                  >
                    {user.gender}
                  </td>

                  <td
                    className={`storedDataCol ${isSelected ? 'highlightRow' : ''}`}
                  >
                    {/* Edit Icon
                        1. Highlight selected row
                        2. Open form with selected row data
                    */}
                    <img
                      src={editIcon}
                      className="editDeleteIcon"
                      alt="Edit"
                      onClick={() => {
                        setSelectedRow(index)
                        onEdit(index)
                      }}
                    />

                    {/* Delete Icon
                        1. Highlight selected row
                        2. Store delete index
                        3. Open confirmation modal
                    */}
                    <img
                      src={deleteIcon}
                      className="editDeleteIcon"
                      alt="Delete"
                      onClick={() => {
                        setSelectedRow(index)
                        setDeleteIndex(index)
                        setShowModal(true)
                      }}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal delete confirmation popup*/}
      <ConfirmModal
        isOpen={showModal}
        title={deleteConformModal.delConfTitle}
        message={deleteConformModal.delConfMsg}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  )
}
