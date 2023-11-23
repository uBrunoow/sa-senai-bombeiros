export const verifyCinematicAvaliation = (value: boolean) => {
  if (value === true) {
    return '<div class="radioType"></div>'
  } else {
    return '<div class="noRadio"></div>'
  }
}
