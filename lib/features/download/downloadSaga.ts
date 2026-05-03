import { put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { downloadRequest, downloadSuccess, downloadFailure } from './downloadSlice';

function* handleDownload(action: PayloadAction<{ downloadUrl: string }>): Generator<any, void, any> {
  try {
    const { downloadUrl } = action.payload;
    
    // Open download URL in new window/tab
    window.open(downloadUrl, '_blank');

    yield put(downloadSuccess());
  } catch (error: any) {
    yield put(downloadFailure(error.message || 'Download failed'));
  }
}

export function* watchDownload() {
  yield takeLatest(downloadRequest.type, handleDownload);
}

// Made with Bob
