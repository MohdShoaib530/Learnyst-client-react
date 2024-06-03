import { configureStore } from '@reduxjs/toolkit';

import authSliceReducer from './slices/authSlice.js';
import courseSliceReducer from './slices/courseSlice.js';
import lectureSliceReducer from './slices/lectureSlice.js';

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    lecture: lectureSliceReducer
  }
});
export default store;
