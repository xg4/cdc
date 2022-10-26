import axios from 'axios'

export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => Promise.reject(error)
)
