export const determineCompletness = (localTraumasEmpty: number) => {
  if (localTraumasEmpty === 0) {
    return 4
  } else if (localTraumasEmpty >= 1) {
    return 3
  } else if (localTraumasEmpty >= 2) {
    return 2
  } else if (localTraumasEmpty >= 3) {
    return 1
  } else if (localTraumasEmpty === 4) {
    return 0
  }
  return null
}
