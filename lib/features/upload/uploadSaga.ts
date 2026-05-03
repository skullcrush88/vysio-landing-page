import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../api/client';
import { uploadRequest, uploadSuccess, uploadFailure } from './uploadSlice';

function* handleUpload(action: PayloadAction<File | string>): Generator<any, void, any> {
  try {
    const payload = action.payload;
    let response;

    if (typeof payload === 'string') {
      // URL upload - send as JSON
      response = yield call(apiClient.post, '/upload', { url: payload });
    } else {
      // File upload - send as multipart/form-data
      const formData = new FormData();
      formData.append('file', payload);
      
      response = yield call(apiClient.post, '/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }

    yield put(uploadSuccess({
      fileId: response.data.fileId,
      fileUrl: response.data.fileUrl,
    }));
  } catch (error: any) {
    yield put(uploadFailure(error.response?.data?.message || error.message || 'Upload failed'));
  }
}

export function* watchUpload() {
  yield takeLatest(uploadRequest.type, handleUpload);
}

// Made with Bob
