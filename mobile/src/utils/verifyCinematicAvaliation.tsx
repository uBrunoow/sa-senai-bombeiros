export const verifyCinematicAvaliation = (value: boolean) => {
  if (value === true) {
    return <div className="radioType"></div>
  } else {
    return <div className="noRadio"></div>
  }
}
