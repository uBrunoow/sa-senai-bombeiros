import { format } from 'date-fns'

export const formatDate = (dateString?: Date | string) => {
  if (dateString === undefined) {
    return 'Não inserido'
  } else {
    const date = new Date(dateString)
    const formattedDate = format(date, 'dd/MM/yyyy')
    return formattedDate
  }
}
