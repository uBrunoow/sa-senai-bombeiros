import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://10.3.78.121:3333',
  // IP DO LUCIANO: 10.3.77.141
  // IP DO BRUNOW 10.3.77.215 && IP CASA DO BRUNOW 192.168.0.9
  // IP DA AUPI: 172.16.1.106
  // IP DO POKAWA 10.3.78.121
})
