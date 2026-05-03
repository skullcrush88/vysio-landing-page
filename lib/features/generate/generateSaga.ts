import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../api/client';
import { generateRequest, generateSuccess, generateFailure } from './generateSlice';

function* handleGenerate(action: PayloadAction<{ fileId: string }>): Generator<any, void, any> {
  try {
    const { fileId } = action.payload;
    
    const response = yield call(apiClient.post, '/generate-code', { fileId });

    yield put(generateSuccess({
      downloadUrl: response.data.downloadUrl,
    }));
  } catch (error: any) {
    yield put(generateFailure(error.response?.data?.message || error.message || 'Code generation failed'));
  }
}

export function* watchGenerate() {
  yield takeLatest(generateRequest.type, handleGenerate);
}

// Made with Bob
