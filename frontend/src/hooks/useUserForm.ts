/*
 ****************************************************************************************************************************
 * Filename    : useUserForm
 * Description : This file handles form state, validation and submit operations
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-29
 ****************************************************************************************************************************
 */

import React, { useState, ChangeEvent, SubmitEvent, useEffect } from 'react'

import { toast } from 'react-toastify'

import {
  checkNotIsEmpty,
  validateEmail,
  validateFlexiblePhone,
} from '../utils/validation'

import { USER_MESSAGES, CONSOLE_MSG, TOAST_MSG } from '../constants'

import { saveUsersToStorage } from '../services'

import type { EntryDataBase } from '../types'

type UseUserFormProps = {
  tableData: EntryDataBase[]
  setTableData: React.Dispatch<React.SetStateAction<EntryDataBase[]>>
  editIndex: number | null
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>
  editUser: EntryDataBase | null
  setSelectedRow: React.Dispatch<React.SetStateAction<number | null>>
}

export default function useUserForm({
  tableData,
  setTableData,
  editIndex,
  setEditIndex,
  editUser,
  setSelectedRow,
}: UseUserFormProps) {
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

      try {
        saveUsersToStorage(updatedData)
      } catch (error) {
        console.error(CONSOLE_MSG.saveDataErr, error)
        toast.error(TOAST_MSG.saveFail, { position: 'top-right' })
      }

      setEditIndex(null)

      // Toast Popup
      toast.success(USER_MESSAGES.editSuccess, {
        position: 'top-right',
      })
    } else {
      /* Adding new data */
      const updatedData = [userData, ...tableData]

      setTableData(updatedData)

      try {
        saveUsersToStorage(updatedData)
      } catch (error) {
        console.error(CONSOLE_MSG.saveDataErr, error)
        toast.error(TOAST_MSG.saveFail, { position: 'top-right' })
      }

      // Toast Popup
      toast.success(USER_MESSAGES.saveSuccess, {
        position: 'top-right',
      })

      setEditIndex(null)
      setSelectedRow(null)
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

  return {
    formData,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}
