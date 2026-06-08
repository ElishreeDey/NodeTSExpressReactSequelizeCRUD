/*
 ****************************************************************************************************************************
 * Filename    : useUserForm
 * Description : This file handles form state, validation and submit operations
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-29
 ****************************************************************************************************************************
 */

import React, { useState, useEffect } from 'react'

import { toast } from 'react-toastify'

import {
  checkNotIsEmpty,
  validateEmail,
  validateFlexiblePhone,
} from '../utils/validation'

import { CONSOLE_MSG, USER_MESSAGES, TOAST_MSG } from '../constants'

import type { EntryDataBase } from '../types'

type UseUserFormProps = {
  tableData: EntryDataBase[]

  createItem: (item: EntryDataBase) => Promise<any>

  updateItem: (id: number, item: EntryDataBase) => Promise<any>

  refresh: () => Promise<void>

  editIndex: number | null

  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>

  editUser: EntryDataBase | null

  setSelectedRow: React.Dispatch<React.SetStateAction<number | null>>
}

export default function useUserForm({
  createItem,
  updateItem,
  refresh,
  setEditIndex,
  editUser,
  setSelectedRow,
}: UseUserFormProps) {
  /* Initial Form State */
  const INITIAL_FORM_STATE = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    mandatoryName: '*',
    mandatoryEmail: '*',
    mandatoryPhone: '*',
  }

  /* Form State */
  const [formData, setFormData] = useState(INITIAL_FORM_STATE)

  /* Load Edit User Data / Reset Form */
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
    } else {
      setFormData(INITIAL_FORM_STATE)
    }
  }, [editUser])

  /* Handle Input Change */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /* Handle Field Validation */
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        phone: result.isValid ? result.formattedPhone : value,
        mandatoryPhone:
          value === '' ? '*' : result.isValid ? '' : result.errorMessage,
      }))
    }
  }

  /* Handle Form Submit */
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()

    //console.log(CONSOLE_MSG.msgSubmitBtnClk)

    /* Validate all fields before submit */
    const nameValidation = checkNotIsEmpty(formData.name)
    const emailValidation = validateEmail(formData.email)
    const phoneValidation = validateFlexiblePhone(formData.phone)

    setFormData((prev) => ({
      ...prev,
      mandatoryName: nameValidation.isValid ? '' : nameValidation.errorMessage,
      mandatoryEmail: emailValidation.isValid
        ? ''
        : emailValidation.errorMessage,
      mandatoryPhone: phoneValidation.isValid
        ? ''
        : phoneValidation.errorMessage,
    }))

    if (
      !nameValidation.isValid ||
      !emailValidation.isValid ||
      !phoneValidation.isValid
    ) {
      return
    }

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: phoneValidation.formattedPhone,
        gender: formData.gender,
      }

      /* EDIT USER */
      if (editUser) {
        await updateItem(editUser.id, {
          id: editUser.id,
          ...userData,
        })

        await refresh()

        setEditIndex(null)
        setSelectedRow(null)

        toast.success(USER_MESSAGES.editSuccess, {
          position: 'top-right',
        })
      } else {
        /* ADD USER */
        await createItem({
          ...userData,
        } as EntryDataBase)

        await refresh()

        toast.success(USER_MESSAGES.saveSuccess, {
          position: 'top-right',
        })
      }

      /* Reset Form */
      setFormData(INITIAL_FORM_STATE)
    } catch (error) {
      console.error(CONSOLE_MSG.failedToSubmitErr, error)
      toast.error(TOAST_MSG.saveFail)
    }
  }

  return {
    formData,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}
