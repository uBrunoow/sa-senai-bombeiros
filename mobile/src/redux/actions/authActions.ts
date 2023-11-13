export const saveToken = (
  token: string,
  userId: number,
  expirationDate: number,
) => {
  return {
    type: 'SAVE_TOKEN',
    payload: { token, userId, expirationDate },
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
  }
}
