/*
 ****************************************************************************************************************************
 * Filename    : Input
 * Description : Reusable Input UI component
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-02
 ****************************************************************************************************************************
 */

import React from 'react'

/* Props Type */
type InputProps = {
  type: string
  id: string
  name: string
  value: string
  required?: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.ChangeEventHandler<HTMLInputElement>
}

/* Component */
export default function Input({
  type,
  id,
  name,
  value,
  required = false,
  onChange,
  onBlur,
}: InputProps) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}
