/*
 ****************************************************************************************************************************
 * Filename    : index
 * Description : Save all application constant values
 ****************************************************************************************************************************
 */

/* Toast Background Colors */
export const MESSAGE_COLORS = {
  success: '#008000',
  alert: '#FFBF00',
  error: '#FF0000',
} as const

/* Validation Messages */
export const VALIDATION_MESSAGES = {
  emailRequired: 'Email is required!',
  phoneRequired: 'Phone is required!',
  nameRequired: 'Name is required!',
  mandatoryFields: 'Please fill all required fields',
} as const

/* Success and Action Messages */
export const USER_MESSAGES = {
  saveSuccess: 'Data saved successfully.',
  editSuccess: 'Data edited successfully.',
  deleteCancel: 'Deletion action is cancelled.',
} as const

/* Delete Confirmation Modal Text */
export const DELETE_CONFIRM_MODAL = {
  title: 'Delete Confirmation',
  message: 'Are you sure you want to delete this record?',
} as const
