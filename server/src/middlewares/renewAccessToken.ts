import axios from 'axios'

export const renewAccessToken = async (refreshToken: string) => {
  console.log('Renovando token com refreshToken:', refreshToken)
  try {
    const response = await axios.post(
      'http://192.168.0.6:3333/api/users/refresh-token',
      {
        refreshToken,
      },
    )
    console.log('Resposta da renovação:', response.data)
    return response.data.token
  } catch (error) {
    console.error('Erro ao renovar o token:', error)
    throw error
  }
}
