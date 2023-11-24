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
export const saveIntroductionCompletness = createAction<number | null>(
  'SAVE_INTRODUCTION_COMPLETNESS',
)
export const saveInfoPacienteCompletness = createAction<number | null>(
  'SAVE_INFO_PACIENTE_COMPLETNESS',
)
export const saveLocalTraumasCompletness = createAction<number | null>(
  'SAVE_LOCAL_TRAUMAS',
)

interface CompletnessState {
  anamnesisCompletness: number | null
  finalizationCompletness: number | null
  gesAnamnesisCompletness: number | null
  introductionCompletness: number | null
  infoPacienteCompletness: number | null
  localTraumasCompletness: number | null
}

const initialCompletnessState: CompletnessState = {
  anamnesisCompletness: null,
  finalizationCompletness: null,
  gesAnamnesisCompletness: null,
  introductionCompletness: null,
  infoPacienteCompletness: null,
  localTraumasCompletness: null,
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
  [saveIntroductionCompletness.type]: (
    state,
    action: PayloadAction<number>,
  ) => {
    state.introductionCompletness = action.payload
  },
  [saveInfoPacienteCompletness.type]: (
    state,
    action: PayloadAction<number>,
  ) => {
    state.infoPacienteCompletness = action.payload
  },
  [saveLocalTraumasCompletness.type]: (
    state,
    action: PayloadAction<number>,
  ) => {
    state.localTraumasCompletness = action.payload
  },
})

export default completnessReducer
