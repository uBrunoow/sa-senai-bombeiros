import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://172.16.1.39:3333',
  // IP DO LUCIANO: 10.3.77.141
  // IP DO BRUNOW 10.3.76.234 && IP CASA DO BRUNOW 192.168.0.9
  // IP DA AUPI: 172.16.1.39
  // IP DO POKAWA 10.3.78.121
  // IP DA CASINHA DO LU 10.0.0.185
  // IP DO LUCIANO SENAC 10.10.134.67
})
