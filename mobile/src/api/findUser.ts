import { api } from '../lib/api'

const findUser = async (userId: number) => {
  try {
    const response = await api.get(`/api/users/${userId}`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter os usuários:', error)
    return []
  }
}

export default findUser
