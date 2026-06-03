import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const EMAIL = import.meta.env.VITE_EMAIL_TO_GENERATE_TOKEN

export const authService = {
  async getToken() {
    const response = await axios.post(`${BASE_URL}/login`, {
      email: EMAIL,
    })

    return response.data?.token
  },
}
