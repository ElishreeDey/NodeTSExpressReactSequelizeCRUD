/*
 ****************************************************************************************************************************
 * Filename    : userService
 * Description : All HTTP calls for the /users resource. Hooks import these functions
 *               instead of calling the axios instance directly, keeping fetch logic
 *               out of React state management code.
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-10
 ****************************************************************************************************************************
 */

import api from './api'
import type { EntryDataBase } from '../types'

export const userService = {
  // GET /users — fetch all user records
  getAll: () => api.get<EntryDataBase[]>('/users'),

  // POST /users — create a new user record
  create: (data: Omit<EntryDataBase, 'id'>) =>
    api.post<EntryDataBase>('/users', data),

  // PUT /users/:id — update an existing user record
  update: (id: number, data: EntryDataBase) =>
    api.put<EntryDataBase>(`/users/${id}`, data),

  // DELETE /users/:id — remove a user record
  remove: (id: number) => api.delete(`/users/${id}`),
}
