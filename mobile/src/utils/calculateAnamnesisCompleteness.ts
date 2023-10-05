export const calculateAnamnesisCompleteness = (anamnesis) => {
  if (!anamnesis) {
    return 0
  }

  const filledFieldsCount = Object.values(anamnesis).filter(Boolean).length

  console.log(filledFieldsCount)

  if (filledFieldsCount === 0) {
    return 0
  } else if (filledFieldsCount === 3) {
    return 1
  } else if (filledFieldsCount === 8) {
    return 2
  } else {
    return 4
  }
}
