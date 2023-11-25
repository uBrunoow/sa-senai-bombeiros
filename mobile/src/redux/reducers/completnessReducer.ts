import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CompletnessState {
  anamnesisCompletness: number | null
  finalizationCompletness: number | null
  gesAnamnesisCompletness: number | null
  introductionCompletness: number | null
  infoPacienteCompletness: number | null
  localTraumasCompletness: number | null
  infoTransportCompletness: number | null
}

const initialCompletnessState: CompletnessState = {
  anamnesisCompletness: null,
  finalizationCompletness: null,
  gesAnamnesisCompletness: null,
  introductionCompletness: null,
  infoPacienteCompletness: null,
  localTraumasCompletness: null,
  infoTransportCompletness: null,
}

const completnessSlice = createSlice({
  name: 'completness',
  initialState: initialCompletnessState,
  reducers: {
    saveAnamnesisCompletness: (state, action: PayloadAction<number>) => {
      state.anamnesisCompletness = action.payload
    },
    saveFinalizationCompletness: (
      state,
      action: PayloadAction<number | null>,
    ) => {
      state.finalizationCompletness = action.payload
    },
    saveGesAnamnesisCompletness: (state, action: PayloadAction<number>) => {
      state.gesAnamnesisCompletness = action.payload
    },
    saveIntroductionCompletness: (state, action: PayloadAction<number>) => {
      state.introductionCompletness = action.payload
    },
    saveInfoPacienteCompletness: (state, action: PayloadAction<number>) => {
      state.infoPacienteCompletness = action.payload
    },
    saveLocalTraumasCompletness: (state, action: PayloadAction<number>) => {
      state.localTraumasCompletness = action.payload
    },
    saveInfoTransportCompletness: (state, action: PayloadAction<number>) => {
      state.infoTransportCompletness = action.payload
    },
  },
})

export const {
  saveAnamnesisCompletness,
  saveFinalizationCompletness,
  saveGesAnamnesisCompletness,
  saveIntroductionCompletness,
  saveInfoPacienteCompletness,
  saveLocalTraumasCompletness,
  saveInfoTransportCompletness,
} = completnessSlice.actions

export default completnessSlice.reducer
