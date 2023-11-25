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

    return {
      status: response.status,
      data: response.data,
    }
  } catch (error: any) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
      }
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Error setting up the request:', error.message)
    }

    return {
      status: 500,
      data: null,
    }
  }
}

export default loginUser
