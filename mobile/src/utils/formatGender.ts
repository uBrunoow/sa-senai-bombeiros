export const formatGender = (gender?: string) => {
  if (gender === 'Female') {
    return 'Feminino'
  } else if (gender === 'Male') {
    return 'Masculino'
  } else {
    return 'Não inserido'
  }
}
