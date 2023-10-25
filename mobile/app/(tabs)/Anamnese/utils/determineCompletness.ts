export const determineCompletness = (emptyOrFalseCount: number) => {
  if (emptyOrFalseCount === 0) {
    return 4
  } else if (emptyOrFalseCount >= 1 && emptyOrFalseCount <= 4) {
    return 3
  } else if (emptyOrFalseCount >= 4 && emptyOrFalseCount <= 8) {
    return 2
  } else if (emptyOrFalseCount >= 8 && emptyOrFalseCount <= 12) {
    return 1
  } else if (emptyOrFalseCount === 13) {
    return 0
  }
  return null
}
