export const determineCompletness = (transportEmpty: number) => {
  if (transportEmpty === 0) {
    return 4
  } else if (transportEmpty >= 1 && transportEmpty <= 2) {
    return 3
  } else if (transportEmpty >= 2 && transportEmpty <= 4) {
    return 2
  } else if (transportEmpty >= 4 && transportEmpty <= 6) {
    return 1
  } else if (transportEmpty === 7) {
    return 0
  }
  return null
}
