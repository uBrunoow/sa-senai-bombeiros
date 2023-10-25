export const saveAnamnesisCompletness = (
  anamnesisCompletness: number | null,
) => {
  return {
    type: 'SAVE_ANAMNESIS_COMPLETNESS',
    payload: { anamnesisCompletness },
  }
}
