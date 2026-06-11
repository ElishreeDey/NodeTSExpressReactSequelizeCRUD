/*
 ****************************************************************************************************************************
 * Filename    : userTypes
 * Description : It typically contains database fields
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-25
 ****************************************************************************************************************************
 */
export interface UserAttributes {
  id?: number
  name: string
  email: string
  phone: string
  // Restricted to allowed gender values — null when not selected
  gender: 'Male' | 'Female' | 'Other' | null
}
