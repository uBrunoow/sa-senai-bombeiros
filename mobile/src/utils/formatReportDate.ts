export const formatReportDate = (date) => {
  if (!date) {
    return null
  }

  const parsedDate = new Date(date)

  // Check if the parsedDate is a valid date
  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date')
  }

  const formattedDate = parsedDate.toISOString().split('T')[0]
  return formattedDate
}
