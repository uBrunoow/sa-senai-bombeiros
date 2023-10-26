export const saveAnamnesisCompletness = (
  anamnesisCompletness: number | null,
) => {
  return {
    type: 'SAVE_ANAMNESIS_COMPLETNESS',
    payload: { anamnesisCompletness },
  }
}
export const saveFinalizationCompletness = (
  finalizationCompletness: number | null,
) => {
  return {
    type: 'SAVE_FINALIZATION_COMPLETNESS',
    payload: { finalizationCompletness },
  }
}
