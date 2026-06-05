/*
 ****************************************************************************************************************************
 * Filename    : api
 * Description : Single entry point for all backend communication.
 * Author      : Elishree Dey Chand
 * Created     : 2026-06-03
 ****************************************************************************************************************************
 */

/* Axios is a popular, promise-based HTTP client library used to send asynchronous 
network requests to REST endpoints*/

import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // timeout: if the server does not respond within 10 seconds, Axios
  // cancels the request and throws an error — prevents infinite loading
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
