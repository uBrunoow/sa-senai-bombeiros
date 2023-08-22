import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://10.3.78.11:3333',
  // IP DO LUCIANO: 10.3.77.141
  // IP QUE TAVA ANTES: 10.3.78.11
})
