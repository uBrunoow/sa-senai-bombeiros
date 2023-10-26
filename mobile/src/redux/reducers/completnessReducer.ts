import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit'

export const saveAnamnesisCompletness = createAction<number | null>(
  'SAVE_ANAMNESIS_COMPLETNESS',
)
export const saveFinalizationCompletness = createAction<number | null>(
  'SAVE_FINALIZATION_COMPLETNESS',
)

interface CompletnessState {
  anamnesisCompletness: number | null
  finalizationCompletness: number | null
}

const initialCompletnessState: CompletnessState = {
  anamnesisCompletness: null,
  finalizationCompletness: null,
}

const completnessReducer = createReducer(initialCompletnessState, {
  [saveAnamnesisCompletness.type]: (state, action: PayloadAction<number>) => {
    state.anamnesisCompletness = action.payload
  },
  [saveFinalizationCompletness.type]: (
    state,
    action: PayloadAction<number | null>,
  ) => {
    state.finalizationCompletness = action.payload
  },
})

export default completnessReducer
