import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit'

export const saveAnamnesisCompletness = createAction<number | null>(
  'SAVE_ANAMNESIS_COMPLETNESS',
)
export const saveFinalizationCompletness = createAction<number | null>(
  'SAVE_FINALIZATION_COMPLETNESS',
)
export const saveGesAnamnesisCompletness = createAction<number | null>(
  'SAVE_GES_ANAMNESIS_COMPLETNESS',
)

interface CompletnessState {
  anamnesisCompletness: number | null
  finalizationCompletness: number | null
  gesAnamnesisCompletness: number | null
}

const initialCompletnessState: CompletnessState = {
  anamnesisCompletness: null,
  finalizationCompletness: null,
  gesAnamnesisCompletness: null,
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
  [saveGesAnamnesisCompletness.type]: (
    state,
    action: PayloadAction<number>,
  ) => {
    state.gesAnamnesisCompletness = action.payload
  },
})

export default completnessReducer
