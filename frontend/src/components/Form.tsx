/*
 ****************************************************************************************************************************
 * Filename    : Form
 * Description : This file holds Form design for New Registation Data
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-13
 ****************************************************************************************************************************
 */

import React, { useState, ChangeEvent, SubmitEvent, useEffect } from 'react'

// These imports are for Toastify pop-ups
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//import faceIcon from images.ts file';
import { faceIcon } from '../assets/images'

import {
  checkNotIsEmpty,
  validateEmail,
  validateFlexiblePhone,
} from '../utils/validation'

import { addEditDeleteMsgText } from '../utils/constants'

import type { EntryDataBase } from '../type'

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
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phone: '',
    gender: '',
    mandatoryName: '*',
    mandatoryEmail: '*',
    mandatoryPhone: '*',
  })

  // useEffect is a React Hook. When editUser clicked , fill the form with that user's data.
  useEffect(() => {
    if (editUser) {
      setFormData({
        userName: editUser.username,
        email: editUser.email,
        phone: editUser.phone,
        gender: editUser.gender,
        mandatoryName: '*',
        mandatoryEmail: '*',
        mandatoryPhone: '*',
      })
    }
  }, [editUser])

  /* Save Data to LocalStorage */
  const saveToLocalStorage = (data: EntryDataBase[]) => {
    try {
      localStorage.setItem('setLocalStorageJSON', JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save data:', error)
      toast.error('Unable to save data', { position: 'top-right' })
    }
  }

  /* Handle Input Change */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /* Handle Validation on Blur */
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Name Validation
    if (name === 'userName') {
      const result = checkNotIsEmpty(value)
      setFormData((prev) => ({
        ...prev,
        mandatoryName:
          value === '' ? '*' : result.isValid ? '' : result.errorMessage,
      }))
    }

    // Email Validation
    if (name === 'email') {
      const result = validateEmail(value)
      setFormData((prev) => ({
        ...prev,
        mandatoryEmail:
          value === '' ? '*' : result.isValid ? '' : result.errorMessage,
      }))
    }

    // Phone Validation
    if (name === 'phone') {
      const result = validateFlexiblePhone(value)
      setFormData((prev) => ({
        ...prev,
        phone: result.isValid ? result.formattedPhone : prev.phone,
        mandatoryPhone:
          value === '' ? '*' : result.isValid ? '' : result.errorMessage,
      }))
    }
  }

  /* Handle Form Submit */
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()

    const userData = {
      username: formData.userName,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
    }

    /* Edit the existing data when user clicks the edit icon */
    if (editIndex !== null) {
      const updatedData = [...tableData]
      updatedData[editIndex] = userData
      setTableData(updatedData)
      saveToLocalStorage(updatedData)
      setEditIndex(null)
      // Toast Popup
      toast.success(`${addEditDeleteMsgText.dataEditMsg}`, {
        position: 'top-right',
      })
    } else {

    /* Adding new data */
      const updatedData = [userData, ...tableData]

      setTableData(updatedData)
      saveToLocalStorage(updatedData)
      // Toast Popup
      toast.success(`${addEditDeleteMsgText.dataSaveMsg}`, {
        position: 'top-right',
      })
      setEditIndex(null) // make edit index null
      setSelectedRow(null) // clear row highlight
    }

    /* CLEAR FORM*/
    setFormData({
      userName: '',
      email: '',
      phone: '',
      gender: '',
      mandatoryName: '*',
      mandatoryEmail: '*',
      mandatoryPhone: '*',
    })
  }

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

      {/* Toastify Popup UI render else toastify pop-up will not open */}
      <ToastContainer />
    </div>
  )
}
