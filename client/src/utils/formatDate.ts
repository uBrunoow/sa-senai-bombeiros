import { format } from 'date-fns'

export const formatDate = (date: string) => {
  const originalDate = new Date(date)
  return format(originalDate, 'dd/MM/yyyy')
}
