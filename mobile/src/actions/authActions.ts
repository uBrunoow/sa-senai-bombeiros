export const saveToken = (token: string, userId: number) => {
  return {
    type: 'SAVE_TOKEN',
    payload: { token, userId },
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
  }
}
