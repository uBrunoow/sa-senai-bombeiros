export const saveToken = (token: string) => {
  return {
    type: 'SAVE_TOKEN',
    payload: token,
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
  }
}
