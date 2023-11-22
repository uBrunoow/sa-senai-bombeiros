export const saveToken = (
  token: string,
  userId: number,
  refreshToken: string,
) => {
  return {
    type: 'SAVE_TOKEN',
    payload: { token, userId, refreshToken },
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
  }
}
