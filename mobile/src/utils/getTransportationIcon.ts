export const getTransportationIcon = (status: string) => {
  switch (status) {
    case 'critico':
      return '<i class="bx bxs-dizzy"></i>'
    case 'estavel':
      return '<i class="bx bxs-happy"></i>'
    case 'instavel':
      return '<i class="bx bxs-sad"></i>'
    case 'possivelmente estavel':
      return '<i class="bx bxs-meh"></i>'
    default:
      return ''
  }
}
