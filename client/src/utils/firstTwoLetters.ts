export const getFirstTwoLetters = (name: string) => {
  if (name && typeof name === 'string' && name.length >= 2) {
    return name.substring(0, 2).toUpperCase() // Obtém as duas primeiras letras em maiúsculas
  }
  return ''
}
