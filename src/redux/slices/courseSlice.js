import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import axiosInstance from '../../helpers/axiosInstance.js';

const initialState = {
  courseData: []
};
export const getAllCourses = createAsyncThunk('/course/get', async () => {
  try {
    const res = axiosInstance.get('/courses');
    toast.promise(res, {
      loading: 'Wait! Fectching courses ....',
      success: 'courses fetched successfully',
      error: 'Failed to fetch courses'
    });
    return (await res).data.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
});
export const createNewCourse = createAsyncThunk(
  '/course/create',
  async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data?.title);
      formData.append('description', data?.description);
      formData.append('category', data?.category);
      formData.append('createdBy', data?.createdBy);
      formData.append('thumbnail', data?.thumbnail);
      console.log('formdata', formData);

      const response = axiosInstance.post('/courses', formData);
      toast.promise(response, {
        loading: 'Creating new course',
        success: 'Course created successfully',
        error: 'Failed to create course'
      });

      return (await response)?.data;
    } catch (error) {
      console.log('error', error);
      return error?.response?.data;
    }
  }
);
export const deleteCourseById = createAsyncThunk(
  '/course/delete',
  async (id) => {
    try {
      const response = axiosInstance.delete(`/courses/${id}`);
      toast.promise(response, {
        loading: 'deleting Course',
        success: 'Course deleted successfully',
        error: 'Failed to delete course'
      });

      return (await response)?.data;
    } catch (error) {
      console.log('error', error);
      return error?.response?.data;
    }
  }
);
export const purchasedCourses = createAsyncThunk(
  '/course/purchased',
  async (data) => {
    try {
      const response = axiosInstance.get('/course/purchased', data);
      toast.promise(response, {
        loading: 'Fetching your courses',
        success: 'Course fetched successfully',
        error: 'Failed to fetch your course'
      });

      return (await response)?.data;
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.courseData = [...action.payload];
      }
    });
  }
});

export default courseSlice.reducer;
