import axios from 'axios'

export const renewAccessToken = async (refreshToken: string) => {
  try {
    console.log('Renovando token com refreshToken:', refreshToken)
    const response = await axios.post(
      'http://10.3.78.121:3333/api/users/refresh-token',
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
