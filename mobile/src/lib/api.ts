import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.93.15:3333',
})
