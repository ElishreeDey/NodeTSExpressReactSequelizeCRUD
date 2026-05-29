/*
 ***********************************************************************************************
 * Filename    : validation
 * Description : This file holds all functions for validating the input fields during entry
 * Functions   : "checkNotIsEmpty", "validateEmail", "validateFlexiblePhone"
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-24
 ***********************************************************************************************
 */

//This function will check if the name is empty or not. Can be used for other fields as well if needed to check NotIsEmpty.
export function checkNotIsEmpty(name: string) {
  if (!name || name.trim() === '') {
    return {
      isValid: false,
      errorMessage: 'Please fill the value',
    }
  } else {
    return {
      isValid: true,
      errorMessage: '',
    }
  }
}

//This function will check if the email is valid or not.
export function validateEmail(email: string) {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
  const isValid: boolean = pattern.test(email) //alert(isValid);

  if (!isValid) {
    // Invalid Email
    return {
      isValid: false,
      errorMessage: 'Invalid email address',
    }
  } else {
    return {
      isValid: true,
      errorMessage: '',
    }
  }
}

//This function will check if the phone number is valid or not.
// and returns formatted value + error message
export function validateFlexiblePhone(phone: string) {
  // Remove non-digit characters
  const digitsOnly = phone.replace(/\D/g, '')

  // Validation regex
  const regex: RegExp = /^[0-9]{10}$/

  const isValid: boolean = regex.test(digitsOnly)

  // Invalid phone
  if (!isValid) {
    return {
      isValid: false,
      formattedPhone: phone,
      errorMessage: 'Invalid phone number',
    }
  }

  // Format phone number
  const formattedPhone = digitsOnly.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')

  // Valid phone
  return {
    isValid: true,
    formattedPhone,
    errorMessage: '',
  }
}
