import { combineReducers } from '@reduxjs/toolkit';
import uploadReducer from '../features/upload/uploadSlice';
import generateReducer from '../features/generate/generateSlice';
import downloadReducer from '../features/download/downloadSlice';

const rootReducer = combineReducers({
  upload: uploadReducer,
  generate: generateReducer,
  download: downloadReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

// Made with Bob
