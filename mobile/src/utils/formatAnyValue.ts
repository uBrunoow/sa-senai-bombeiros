export const formatAnyValue = (value: any) => {
  if (value === null || value === undefined || value === 0) {
    return ' '
  }
  return value
}
