import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://10.3.77.141:3333', // A rede do senai é mó bloqueada
  // IP DO LUCIANO: 10.3.77.141
  // IP QUE TAVA ANTES: 10.3.78.11
  // IP DO BRUNOW 10.3.76.82
  // LOOP-BACK REDONDO: 0.0.0.0
  // LOOP-BACK DO STACK-OVERFLOW (PORTUGUÊS): 127.0.0.1
})
