/*
 ****************************************************************************************************************************
 * Filename    : Table
 * Description : This file holds Table design for View Registered Data
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-13
 ****************************************************************************************************************************
 */

import React, { useState } from 'react'

//import listIcon,editIcon,deleteIcon from images.ts file';
import { editIcon, deleteIcon, listIcon } from '../assets/images'

import ConfirmModal from './ConfirmModal/ConfirmModal'

import type { EntryDataBase } from '../type'

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
  /* Modal State */
  const [showModal, setShowModal] = useState(false)

  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)

  /* table design */
  return (
    <div className="tableCard">
      {/* Heading*/}
      <h1>
        {' '}
        <img src={listIcon} className="icon" alt="List Icon" /> Registered
        Data{' '}
      </h1>

      {/* Table Wrapper */}
      <div className="tableWrapper">
        <table id="viewData" className="displayRegisteredData">
          {/* Table Header */}
          <thead>
            <tr>
              <th className="storedDataColHeader"> Name </th>
              <th className="storedDataColHeader"> Email </th>
              <th className="storedDataColHeader"> Phone </th>
              <th className="storedDataColHeader"> Gender </th>
              <th className="storedDataColHeader"> Action </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {tableData.map((user, index) => (
              <tr key={index}>
                <td
                  className={`storedDataCol ${selectedRow === index ? 'highlightRow' : ''}`}
                >
                  {user.username}
                </td>
                <td
                  className={`storedDataCol ${selectedRow === index ? 'highlightRow' : ''}`}
                >
                  {user.email}
                </td>
                <td
                  className={`storedDataCol ${selectedRow === index ? 'highlightRow' : ''}`}
                >
                  {user.phone}
                </td>
                <td
                  className={`storedDataCol ${selectedRow === index ? 'highlightRow' : ''}`}
                >
                  {user.gender}
                </td>
                <td
                  className={`storedDataCol ${selectedRow === index ? 'highlightRow' : ''}`}
                >
                  {/* Edit Icon */}
                  <img
                    src={editIcon}
                    className="editDeleteIcon"
                    alt="Edit"
                    onClick={() => {
                      setSelectedRow(index)
                      onEdit(index)
                    }}
                  />

                  {/* Delete Icon */}
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showModal}
        title={deleteConformModal.delConfTitle}
        message={deleteConformModal.delConfMsg}
        onConfirm={() => {
          if (deleteIndex !== null) {
            onDelete(deleteIndex)
          }

          setShowModal(false)
          setDeleteIndex(null)
          setSelectedRow(null)
        }}
        onCancel={() => {
          setShowModal(false)
          setDeleteIndex(null)
          setSelectedRow(null)
        }}
      />
    </div>
  )
}
