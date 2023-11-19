import { api } from '@/lib/api'

const findUsers = async () => {
  try {
    const response = await api.get(`/api/users`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter os usuários:', error)
    return []
  }
}

export default findUsers
