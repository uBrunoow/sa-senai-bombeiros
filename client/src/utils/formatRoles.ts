export const formatRole = (role: string) => {
  switch (role) {
    case 'segundoTenente':
      return 'Segundo Tenente'
    case 'primeiroTenente':
      return 'Primeiro Tenente'
    case 'Capitao':
      return 'Capitão'
    case 'Major':
      return 'Major'
    case 'TenenteCoronel':
      return 'Tenente Coronel'
    case 'Admin':
      return 'Admin'
    default:
      return role
  }
}
