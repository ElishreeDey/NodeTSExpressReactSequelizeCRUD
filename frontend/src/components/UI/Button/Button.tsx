/*
 ****************************************************************************************************************************
 * Filename    : Button
 * Description : Reusable Button UI component
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-02
 ****************************************************************************************************************************
 */

import React from 'react'

/* Props Type */
type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

/* Component */
export default function Button({
  type = 'button',
  children,
  onClick,
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  )
}
