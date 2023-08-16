import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://10.3.78.11:3333',
})
