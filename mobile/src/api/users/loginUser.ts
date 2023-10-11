import { api } from '@src/lib/api'

const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post(
      '/api/users/login',
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    return data
  } catch (error) {
    console.error('Erro ao enviar os usuários:', error)
    return null
  }
}

export default loginUser
