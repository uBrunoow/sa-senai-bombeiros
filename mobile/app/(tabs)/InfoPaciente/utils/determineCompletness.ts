export const determineCompletness = (
  sinaisVitaisEmpty: number,
  suspectProblemsEmpty: number,
  glasgowEmpty: number,
) => {
  const emptyOrFalseCount =
    sinaisVitaisEmpty + suspectProblemsEmpty + glasgowEmpty

  if (emptyOrFalseCount === 0) {
    return 4
  } else if (emptyOrFalseCount >= 1 && emptyOrFalseCount <= 5) {
    return 3
  } else if (emptyOrFalseCount >= 5 && emptyOrFalseCount <= 10) {
    return 2
  } else if (emptyOrFalseCount >= 10 && emptyOrFalseCount <= 14) {
    return 1
  } else if (emptyOrFalseCount === 15) {
    return 0
  }
  return null
}
