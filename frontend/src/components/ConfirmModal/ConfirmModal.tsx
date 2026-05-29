/*
 ****************************************************************************************************************************
 * Filename    : images
 * Description : This is the ConfirmModel design screen
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-13
 ****************************************************************************************************************************
 */

import React from 'react'

import './ConfirmModal.css'

type ConfirmModalProps = {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  // Don't render anything if modal is closed
  if (!isOpen) return null

  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p className="confirm-message"> {message} </p>
        <div className="confirm-actions">
          <button className="confirm-btn confirm-yes" onClick={onConfirm}>
            Yes
          </button>

          <button className="confirm-btn confirm-no" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  )
}
