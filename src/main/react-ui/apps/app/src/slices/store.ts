import { configureStore } from '@reduxjs/toolkit';
import { fetchReferenceData, referenceDataSlice } from './reference-data.slice';
import { userSlice } from './user.slice';

export const store = configureStore({
  reducer: {
    referenceDataReducer: referenceDataSlice.reducer,
    userReducer: userSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

store.dispatch(fetchReferenceData());
