import { all } from 'redux-saga/effects';
import { watchUpload } from '../features/upload/uploadSaga';
import { watchGenerate } from '../features/generate/generateSaga';
import { watchDownload } from '../features/download/downloadSaga';

export default function* rootSaga() {
  yield all([
    watchUpload(),
    watchGenerate(),
    watchDownload(),
  ]);
}

// Made with Bob
