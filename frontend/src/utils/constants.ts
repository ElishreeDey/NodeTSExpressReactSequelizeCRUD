/*
 ****************************************************************************************************************************
 * Filename    : constants
 * Description : Save all Constant values
 ****************************************************************************************************************************
 */

// Snackbar Background Color based on success,alert,error messages
export const MsgBgCol = {
  successMsgCol: '#008000',
  alertMsgCol: '#FFBF00',
  errMsgCol: '#FF0000',
} as const

// Validation Error Messages
export const ValidationMsg = {
  emailRequiredTxt: 'Email is required!',
  phoneRequiredTxt: 'Phone is required!',
  nameRequiredTxt: 'Name is required!',
  allMandatoryFieldsRequiredTxt: 'Please fill all required fields',
} as const

// Common Message Texts
export const addEditDeleteMsgText = {
  dataSaveMsg: 'Data saved successfully.',
  dataEditMsg: 'Data edited successfully.',
  deleteCancelTxt: 'Deletion action is cancelled.',
} as const

// Common Message Texts
export const deleteConformModal = {
  delConfTitle: 'Delete Confirmation',
  delConfMsg: 'Are you sure you want to delete this record?',
} as const
