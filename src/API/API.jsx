import React from 'react'
import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
})

export const postRequest = async (endpoint, data) => {
  const response = await api.post(endpoint, data)
  return response.data
}


export default API
