import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DownloadState {
  loading: boolean;
  error: string | null;
}

const initialState: DownloadState = {
  loading: false,
  error: null,
};

const downloadSlice = createSlice({
  name: 'download',
  initialState,
  reducers: {
    downloadRequest: (state, action: PayloadAction<{ downloadUrl: string }>) => {
      state.loading = true;
      state.error = null;
    },
    downloadSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    downloadFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetDownload: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export const { downloadRequest, downloadSuccess, downloadFailure, resetDownload } = downloadSlice.actions;
export default downloadSlice.reducer;

// Made with Bob
