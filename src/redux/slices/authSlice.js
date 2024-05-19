import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  role: 'guest',
  data: {}
};

export const createAccount = createAsyncThunk('/auth/signup', async (data) => {
  try {
    const res = axiosInstance.post('user/register', data);
    toast.promise(res, {
      loading: 'Wait! creating your account',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to create account'
    });
    return (await res)?.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
});

export default authSlice.reducer;
