export const formatReportDate = (date) => {
  if (!date) {
    return null
  }

  const parsedDate = new Date(date)

  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date')
  }

  const formattedDate = parsedDate.toISOString().split('T')[0]
  return formattedDate
}
