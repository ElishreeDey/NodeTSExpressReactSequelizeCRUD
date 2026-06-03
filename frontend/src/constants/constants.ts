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

/* Console Error Messages */
export const CONSOLE_MSG = {
  saveDataErr: 'Failed to save data:',
  loadDataErr: 'Failed to load data:',
  deleteDataErr: 'Failed to delete data:',
  localStorageReadErr: 'Failed to read localStorage:',
  localStorageSaveErr: 'Failed to save localStorage:',

  failedToGetTokenErr: 'Failed to get token',
  authenticationFailedErr:
    'Authentication failed. Please check your connection.',
  tokenSuccessMsg: 'Token stored successfully',
  noTokenReturnErr: 'No token returned from server',

  msgSubmitBtnClk: 'SUBMIT TRIGGERED',
  failedToSubmitErr: 'Failed to save user:',
} as const

/* Toast Error Messages */
export const TOAST_MSG = {
  saveFail: 'Unable to save data',
  loadFail: 'Unable to load data',
  deleteFail: 'Unable to delete data',
} as const

/* Validation Messages */
export const VALIDATION_MSG = {
  requiredField: 'Please fill the value',
  invalidEmail: 'Invalid email address',
  invalidPhone: 'Invalid phone number',
} as const
