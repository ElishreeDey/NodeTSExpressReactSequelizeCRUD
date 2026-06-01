/*
 ****************************************************************************************************************************
 * Filename    : Select
 * Description : Reusable Select UI component
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-02
 ****************************************************************************************************************************
 */

import React from 'react'

/* Option Type */
type Option = {
  label: string
  value: string
}

/* Props Type */
type SelectProps = {
  id: string
  name: string
  value: string
  options: Option[]
  onChange: React.ChangeEventHandler<HTMLSelectElement>
}

/* Component */
export default function Select({
  id,
  name,
  value,
  options,
  onChange,
}: SelectProps) {
  return (
    <select id={id} name={name} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
