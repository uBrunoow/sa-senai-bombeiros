import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit'

export const saveAnamnesisCompletness = createAction<number | null>(
  'SAVE_ANAMNESIS_COMPLETNESS',
)

interface CompletnessState {
  anamnesisCompletness: number | null
}

const initialCompletnessState: CompletnessState = {
  anamnesisCompletness: null,
}

const completnessReducer = createReducer(initialCompletnessState, {
  [saveAnamnesisCompletness.type]: (state, action: PayloadAction<number>) => {
    state.anamnesisCompletness = action.payload
  },
})

export default completnessReducer
