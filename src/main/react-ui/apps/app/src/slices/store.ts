import { configureStore } from '@reduxjs/toolkit'
import { fetchReferenceData, referenceDataSlice } from 'slices/reference-data.slice';

export const store = configureStore({
  reducer: {
    referenceDataReducer: referenceDataSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>

store.dispatch(fetchReferenceData());