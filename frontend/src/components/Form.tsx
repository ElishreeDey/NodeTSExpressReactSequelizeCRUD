/*
 ****************************************************************************************************************************
 * Filename    : Form
 * Description : This file holds Form design for New Registation Data
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-13
 ****************************************************************************************************************************
 */

import React from 'react'

//import faceIcon from images.ts file';
import { faceIcon } from '../assets/images'

import useUserForm from '../hooks/useUserForm'

import type { EntryDataBase } from '../types'

/* FormProps - what props are coming into component, what datatype each prop must have */
type FormProps = {
  tableData: EntryDataBase[]
  setTableData: React.Dispatch<React.SetStateAction<EntryDataBase[]>>
  editIndex: number | null
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>
  editUser: EntryDataBase | null
  setSelectedRow: React.Dispatch<React.SetStateAction<number | null>>
}

// Here React component name is "RenderForm" which can be imported into other files.
export default function RenderForm({
  tableData,
  setTableData,
  editIndex,
  setEditIndex,
  editUser,
  setSelectedRow,
}: FormProps) {
  const { formData, handleChange, handleBlur, handleSubmit } = useUserForm({
    tableData,
    setTableData,
    editIndex,
    setEditIndex,
    editUser,
    setSelectedRow,
  })

  return (
    <div id="divFormComponent" className="formCard">
      <h1>
        <img src={faceIcon} className="icon" alt="Face Icon" />
        <span>Registration</span>
      </h1>

      <form id="registrationForm" onSubmit={handleSubmit}>
        <label htmlFor="userName">
          First name:
          <span id="mandatoryName" className="mandatory">
            {formData.mandatoryName}
          </span>
        </label>
        <br />
        <input
          type="text"
          id="userName"
          name="userName"
          required
          value={formData.userName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <br />

        <label htmlFor="email">
          Email:
          <span id="mandatoryEmail" className="mandatory">
            {formData.mandatoryEmail}
          </span>
        </label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <br />

        <label htmlFor="phone">
          Phone:
          <span id="mandatoryPhone" className="mandatory">
            {formData.mandatoryPhone}
          </span>
        </label>
        <br />
        <input
          type="text"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <br />

        <label htmlFor="gender">Gender:</label>
        <br />
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female"> Female</option>
        </select>
        <br />
        <br />

        <button id="btnAddData" type="submit">
          {editIndex !== null ? 'Save Changes' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
