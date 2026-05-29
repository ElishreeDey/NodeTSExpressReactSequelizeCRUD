/*
 ****************************************************************************************************************************
 * Filename    : Type
 * Description : This file holds all entry variable type
 * Author      : Elishree Dey Chand
 * Created     : 2026-05-29
 ****************************************************************************************************************************
 */
//specify the entry data types
//Interface name shouls start with capital
export interface EntryDataBase {
  username: string
  email: string
  phone: string
  gender: string
}

//specify the msg data types
//Interface name shouls start with capital
export interface MsgDataType {
  message: string
  color: string
}
