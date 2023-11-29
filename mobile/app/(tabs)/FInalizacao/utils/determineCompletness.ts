export const determineCompletness = (
  finalizationEmpty: number,
  cinematicEmpty: number,
) => {
  const emptyOrFalseCount = finalizationEmpty + cinematicEmpty

  if (emptyOrFalseCount === 0) {
    return 4
  } else if (emptyOrFalseCount >= 1 && emptyOrFalseCount <= 3) {
    return 3
  } else if (emptyOrFalseCount >= 3 && emptyOrFalseCount <= 7) {
    return 2
  } else if (emptyOrFalseCount >= 7 && emptyOrFalseCount <= 11) {
    return 1
  } else if (emptyOrFalseCount === 12) {
    return 0
  }
  return null
}
