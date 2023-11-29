export const determineCompletness = (gesAnamnesisEmpty: number) => {
  if (gesAnamnesisEmpty === 0) {
    return 4
  } else if (gesAnamnesisEmpty >= 1 && gesAnamnesisEmpty <= 5) {
    return 3
  } else if (gesAnamnesisEmpty >= 5 && gesAnamnesisEmpty <= 10) {
    return 2
  } else if (gesAnamnesisEmpty >= 10 && gesAnamnesisEmpty <= 16) {
    return 1
  } else if (gesAnamnesisEmpty === 17) {
    return 0
  }
  return null
}
