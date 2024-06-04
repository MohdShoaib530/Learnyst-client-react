import { configureStore } from '@reduxjs/toolkit';

import authSliceReducer from './slices/authSlice.js';
import courseSliceReducer from './slices/courseSlice.js';
import lectureSliceReducer from './slices/lectureSlice.js';
import paymentSliceReducer from './slices/paymentSlice.js';

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    lecture: lectureSliceReducer,
    payment: paymentSliceReducer
  }
});
export default store;
