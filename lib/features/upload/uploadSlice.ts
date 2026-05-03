import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UploadState {
  loading: boolean;
  error: string | null;
  data: {
    fileId: string;
    fileUrl: string;
  } | null;
}

const initialState: UploadState = {
  loading: false,
  error: null,
  data: null,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    uploadRequest: (state, action: PayloadAction<File | string>) => {
      state.loading = true;
      state.error = null;
    },
    uploadSuccess: (state, action: PayloadAction<{ fileId: string; fileUrl: string }>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    uploadFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetUpload: (state) => {
      state.loading = false;
      state.error = null;
      state.data = null;
    },
  },
});

export const { uploadRequest, uploadSuccess, uploadFailure, resetUpload } = uploadSlice.actions;
export default uploadSlice.reducer;

// Made with Bob
