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
  // withCredentials: tells the browser to send HttpOnly cookies automatically
  // on every request — no manual token handling needed
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
