import api from '../services/api'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const EMAIL = import.meta.env.VITE_EMAIL_TO_GENERATE_TOKEN

export const authService = {
  async getToken() {
    const response = await api.post(`${BASE_URL}/login`, {
      email: EMAIL,
    })

    return response.data?.token
  },
}
