import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://10.0.0.185:3333',
  headers: {
    'Content-Type': 'application/json',
  },
  // IP DO LUCIANO: 10.3.77.141
  // IP DO BRUNOW 10.3.79.132 && IP CASA DO BRUNOW 192.168.0.9
  // IP DA AUPI: 172.16.1.39
  // IP DO POKAWA 10.3.78.121
  // IP DO POKAWA 10.3.78.108 (Evolução (Sextou))
  // IP DA CASINHA DO LU 10.0.0.185
  // IP DO LUCIANO SENAC 10.10.134.67
})
