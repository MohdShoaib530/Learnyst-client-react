import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import axiosInstance from '../../helpers/axiosInstance.js';

const initialState = {
  lectures: []
};
export const getLectures = createAsyncThunk('/lectures/get', async (id) => {
  try {
    const res = axiosInstance.get(`/courses/${id}`);
    toast.promise(res, {
      loading: 'Wait! Fectching lectures ....',
      success: 'lectures fetched successfully',
      error: 'Failed to fetch lectures'
    });
    return (await res).data;
  } catch (error) {
    console.log('error', error);
    return error?.response?.data;
  }
});
export const deleteLecture = createAsyncThunk(
  '/lecture/delete',
  async (data) => {
    try {
      const res = axiosInstance.delete('/courses', data);
      toast.promise(res, {
        loading: 'Wait! deleting lecture ....',
        success: 'lecture deleted successfully',
        error: 'Failed to delete lecture'
      });
      return (await res).data.data;
    } catch (error) {
      console.log('error', error);
      return error?.response?.data;
    }
  }
);
export const addLectures = createAsyncThunk('/lecture/add', async (data) => {
  try {
    const formdata = new FormData();
    formdata.append('title', data.title);
    formdata.append('description', data.description);
    formdata.append('lecture', data.lecture);

    const res = axiosInstance.post(`/courses/${data.id}`, formdata);
    toast.promise(res, {
      loading: 'Uploading lecture ....',
      success: 'lecture uploaded successfully',
      error: 'Something went wrong !'
    });
    return (await res)?.data;
  } catch (error) {
    console.log('error', error);
    return error?.response?.data;
  }
});

const courseSlice = createSlice({
  name: 'lecture',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLectures.fulfilled, (state, action) => {
        console.log('action', action.payload);
        if (action.payload.success) {
          state.lectures = action.payload.data.course.lectures;
        }
      })
      .addCase(addLectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.data?.lectures;
      });
  }
});

export default courseSlice.reducer;
