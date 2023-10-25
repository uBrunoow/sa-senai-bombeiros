export const determineCompletness = (
  reportEmpty: number,
  preHospitalarEmpty: number,
  SignsEmpty: number,
) => {
  const emptyOrFalseOrNullOrZeroCount: number =
    reportEmpty + preHospitalarEmpty + SignsEmpty

  if (emptyOrFalseOrNullOrZeroCount === 0) {
    return 4
  } else if (
    emptyOrFalseOrNullOrZeroCount >= 1 &&
    emptyOrFalseOrNullOrZeroCount <= 2
  ) {
    return 3
  } else if (
    emptyOrFalseOrNullOrZeroCount >= 2 &&
    emptyOrFalseOrNullOrZeroCount <= 4
  ) {
    return 2
  } else if (
    emptyOrFalseOrNullOrZeroCount >= 4 &&
    emptyOrFalseOrNullOrZeroCount <= 7
  ) {
    return 1
  } else if (emptyOrFalseOrNullOrZeroCount === 8) {
    return 0
  }
  return null
}
