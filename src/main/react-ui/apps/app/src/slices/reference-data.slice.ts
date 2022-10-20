import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleResponse } from 'services/response.service';
import { ReferenceData } from 'types/reference-data';

export const fetchReferenceData = createAsyncThunk('referenceData/fetchReferenceData', async (arg, thunkApi) => {
  try {
    const response = await fetch('/api/reference-data');
    return await handleResponse<ReferenceData>(response);
  } catch (e) {
    thunkApi.rejectWithValue(e);
  }
});

export type ReferenceDataState = {
  data?: ReferenceData;
  loading: boolean;
  error?: Error;
};

export const referenceDataSlice = createSlice({
  name: 'referenceData',
  initialState: {
    data: null,
    loading: false,
    error: null
  } as ReferenceDataState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReferenceData.pending, (state, action) => {
      state.data = null;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchReferenceData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchReferenceData.rejected, (state, action) => {
      state.data = null;
      state.loading = true;
      state.error = action.payload as Error;
    });
  }
});
