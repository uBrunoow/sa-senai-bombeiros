import { api } from '@/lib/api'

const findUniqueUser = async (userId: number | undefined) => {
  try {
    const response = await api.get(`/api/users/${userId}`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter os usuários:', error)
    throw new Error('Failed to fetch user details')
  }
}

export default findUniqueUser
