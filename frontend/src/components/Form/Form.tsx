/*
 ****************************************************************************************************************************
 * Filename    : Form
 * Description : This file holds Form design for New Registration Data
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-13
 ****************************************************************************************************************************
 */

import React from 'react'
import { faceIcon } from '../../assets'
import { useUserForm } from '../../hooks'
import { Input, Select, Button } from '../UI'
import type { EntryDataBase } from '../../types'

/* FormProps - what props are coming into component, what datatype each prop must have */
type FormProps = {
  tableData: EntryDataBase[]
  setTableData: React.Dispatch<React.SetStateAction<EntryDataBase[]>>

  createItem: (item: EntryDataBase) => Promise<any>
  updateItem: (id: number, item: EntryDataBase) => Promise<any>
  refresh: () => Promise<void>

  editIndex: number | null
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>
  editUser: EntryDataBase | null
  setSelectedRow: React.Dispatch<React.SetStateAction<number | null>>
}

// Here React component name is "RenderForm" which can be imported into other files.
export default function RenderForm({
  tableData,
  setTableData,
  createItem,
  updateItem,
  refresh,
  editIndex,
  setEditIndex,
  editUser,
  setSelectedRow,
}: FormProps) {
  const { formData, handleChange, handleBlur, handleSubmit } = useUserForm({
    tableData,
    setTableData,
    createItem,
    updateItem,
    refresh,
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

      <form
        id="registrationForm"
        onSubmit={handleSubmit}
        className="formLayout"
      >
        {/* Name Field Group */}
        <div className="formGroup">
          <label htmlFor="name">
            First name:
            <span id="mandatoryName" className="mandatory">
              {formData.mandatoryName}
            </span>
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        {/* Email Field Group */}
        <div className="formGroup">
          <label htmlFor="email">
            Email:
            <span id="mandatoryEmail" className="mandatory">
              {formData.mandatoryEmail}
            </span>
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        {/* Phone Field Group */}
        <div className="formGroup">
          <label htmlFor="phone">
            Phone:
            <span id="mandatoryPhone" className="mandatory">
              {formData.mandatoryPhone}
            </span>
          </label>
          <Input
            type="text"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        {/* Gender Field Group */}
        <div className="formGroup">
          <label htmlFor="gender">Gender:</label>
          <Select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={[
              { label: 'Select Gender', value: '' },
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ]}
          />
        </div>

        {/* Action Button */}
        <div className="formAction">
          <Button type="submit">
            {editIndex !== null ? 'Save Changes' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  )
}
