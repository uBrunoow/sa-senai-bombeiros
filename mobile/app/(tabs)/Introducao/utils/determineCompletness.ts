export const determineCompletness = (
  reportEmpty: number,
  preHospitalarMethodEmpty: number,
  symptomsEmpty: number,
) => {
  const emptyOrFalseOrNullOrZeroCount: number =
    reportEmpty + preHospitalarMethodEmpty + symptomsEmpty

  if (emptyOrFalseOrNullOrZeroCount === 0) {
    return 4
  } else if (
    emptyOrFalseOrNullOrZeroCount >= 1 &&
    emptyOrFalseOrNullOrZeroCount <= 4
  ) {
    return 3
  } else if (
    emptyOrFalseOrNullOrZeroCount >= 4 &&
    emptyOrFalseOrNullOrZeroCount <= 7
  ) {
    return 2
  } else if (
    emptyOrFalseOrNullOrZeroCount >= 7 &&
    emptyOrFalseOrNullOrZeroCount <= 10
  ) {
    return 1
  } else if (emptyOrFalseOrNullOrZeroCount === 11) {
    return 0
  }
  return null
}
