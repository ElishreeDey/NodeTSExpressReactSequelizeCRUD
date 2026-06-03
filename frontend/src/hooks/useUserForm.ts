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

import { CONSOLE_MSG, USER_MESSAGES } from '../constants'

import type { EntryDataBase } from '../types'

type UseUserFormProps = {
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

export default function useUserForm({
  //tableData,
  //setTableData,
  createItem,
  updateItem,
  refresh,
  //editIndex,
  setEditIndex,
  editUser,
  setSelectedRow,
}: UseUserFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    mandatoryName: '*',
    mandatoryEmail: '*',
    mandatoryPhone: '*',
  })

  useEffect(() => {
    if (editUser) {
      setFormData({
        name: editUser.name,
        email: editUser.email,
        phone: editUser.phone,
        gender: editUser.gender,
        mandatoryName: '*',
        mandatoryEmail: '*',
        mandatoryPhone: '*',
      })
    }
  }, [editUser])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'name') {
      const result = checkNotIsEmpty(value)

      setFormData((prev) => ({
        ...prev,
        mandatoryName:
          value === '' ? '*' : result.isValid ? '' : result.errorMessage,
      }))
    }

    if (name === 'email') {
      const result = validateEmail(value)

      setFormData((prev) => ({
        ...prev,
        mandatoryEmail:
          value === '' ? '*' : result.isValid ? '' : result.errorMessage,
      }))
    }

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

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    console.log(CONSOLE_MSG.msgSubmitBtnClk)
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
      }

      // EDIT USER
      if (editUser) {
        await updateItem(editUser.id, {
          id: editUser.id,
          ...userData,
        })

        await refresh()

        setEditIndex(null)

        toast.success(USER_MESSAGES.editSuccess, {
          position: 'top-right',
        })
      }

      // ADD USER
      else {
        await createItem({
          ...userData,
        } as EntryDataBase)

        await refresh()

        toast.success(USER_MESSAGES.saveSuccess, {
          position: 'top-right',
        })
      }

      setSelectedRow(null)

      setFormData({
        name: '',
        email: '',
        phone: '',
        gender: '',
        mandatoryName: '*',
        mandatoryEmail: '*',
        mandatoryPhone: '*',
      })
    } catch (error) {
      console.error(CONSOLE_MSG.failedToSubmitErr, error)
    }
  }

  return {
    formData,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}
