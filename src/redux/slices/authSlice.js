import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import axiosInstance from '../../helpers/axiosInstance.js';

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
  role:
    localStorage.getItem('role') != undefined
      ? JSON.parse(localStorage.getItem('role'))
      : 'guest',
  data:
    localStorage.getItem('data') != undefined
      ? JSON.parse(localStorage.getItem('data'))
      : {}
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
export const loginAccount = createAsyncThunk('/auth/signin', async (data) => {
  try {
    const res = axiosInstance.post('user/login', data);

    toast.promise(res, {
      loading: 'Wait! logging you in',
      success: (data) => {
        return data?.data?.message;
      },
      error: (data) => {
        return data?.response?.data?.message;
      }
    });
    return (await res)?.data;
  } catch (error) {
    console.log('error', error);
    return error?.response?.data;
  }
});
export const logoutUser = createAsyncThunk('/auth/logout', async (data) => {
  try {
    const res = axiosInstance.post('user/logout', data);

    toast.promise(res, {
      loading: 'Wait! logging you out',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to logout try again'
    });
    return (await res)?.data;
  } catch (error) {
    console.log('error', error);
    return error?.response?.data;
  }
});
export const getUserById = createAsyncThunk('/user/me', async () => {
  try {
    const res = axiosInstance.get('user/profile');

    toast.promise(res, {
      loading: 'Wait! Getting your profile',
      success: (data) => {
        return data?.data?.message;
      },
      error: 'Failed to get profile try again'
    });
    return (await res)?.data;
  } catch (error) {
    console.log('error', error);
    return error?.response?.data;
  }
});
export const changeUserPassword = createAsyncThunk(
  '/user/changePassword',
  async () => {
    try {
      const res = axiosInstance.get('user/change-password');

      toast.promise(res, {
        loading: 'Wait! Getting your profile',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to get profile try again'
      });
      return (await res)?.data;
    } catch (error) {
      console.log('error', error);
      return error?.response?.data;
    }
  }
);
export const deleteAccount = createAsyncThunk(
  '/user/deleteAccount',
  async () => {
    try {
      const res = axiosInstance.delete('user/delete-user');
      toast.promise(res, {
        loading: 'Wait! deleting your account',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to delete account try again'
      });
      return (await res)?.data;
    } catch (error) {
      console.log('error', error);
      return error?.response?.data;
    }
  }
);
export const refreshAccessToken = createAsyncThunk(
  '/user/refreshAccessToken',
  async () => {
    try {
      const res = axiosInstance.post('user/refreshAccessToken');
      return res;
    } catch (error) {
      console.log('error', error);
    }
  }
);
export const emailVerification = createAsyncThunk(
  '/user/getStatus-token',
  async (data) => {
    try {
      console.log(data);
      const res = axiosInstance.post('user/getStatus-token', data);

      toast.promise(res, {
        loading: 'Wait! sending verification email',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to send verification email try again'
      });
      return (await res)?.data;
    } catch (error) {
      console.log('error', error);
      return error?.response?.data;
    }
  }
);
export const emailVerificationStatus = createAsyncThunk(
  '/confirm-status/:confirmToken',
  async (data) => {
    try {
      console.log(data);
      const res = axiosInstance.post(`user/confirm-status/${data}`);

      toast.promise(res, {
        loading: 'Wait! verifying email',
        success: (data) => {
          return data?.data?.message;
        },
        error: (data) => {
          return 'Failed to verify email try again';
        }
      });
      return (await res)?.data;
    } catch (error) {
      console.log('error', error);
      return error?.response?.data;
    }
  }
);
export const changePassword = createAsyncThunk(
  '/user/chanage-password',
  async (data) => {
    try {
      console.log(data);
      const res = axiosInstance.post('user/chanage-password', data);

      toast.promise(res, {
        loading: 'Wait! changing password',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to change password try again'
      });
      return (await res)?.data;
    } catch (error) {
      console.log('error', error);
      return error?.response?.data;
    }
  }
);
export const updateAvatar = createAsyncThunk(
  '/user/update-avatar',
  async (data) => {
    try {
      const res = axiosInstance.post('user/update-avatar', data);

      toast.promise(res, {
        loading: 'Wait! updating your avatar',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to update avatar'
      });
      return (await res)?.data;
    } catch (error) {
      console.log('error', error);
      return error?.response?.data;
    }
  }
);
export const updateCoverImage = createAsyncThunk(
  '/user/update-coverImage',
  async (data) => {
    try {
      const res = axiosInstance.post('user/update-coverImage', data);

      toast.promise(res, {
        loading: 'Wait! updating your coverImage',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to update coverImage try again'
      });
      return (await res)?.data;
    } catch (error) {
      console.log('error', error);
      return error?.response?.data;
    }
  }
);
export const updateName = createAsyncThunk(
  '/user/update-username',
  async (data) => {
    try {
      const res = axiosInstance.post('user/update-username', data);

      toast.promise(res, {
        loading: 'Wait! updating your Name',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to update Name'
      });
      return (await res)?.data;
    } catch (error) {
      console.log('error', error);
      return error?.response?.data;
    }
  }
);
export const updateEmail = createAsyncThunk(
  '/user/update-email',
  async (data) => {
    try {
      const res = axiosInstance.post('user/update-email', data);

      toast.promise(res, {
        loading: 'Wait! sending verification email',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to send verification email try again'
      });
      return (await res)?.data;
    } catch (error) {
      console.log('error', error);
      return error?.response?.data;
    }
  }
);
export const forgotPassword = createAsyncThunk(
  '/user/forgot-password',
  async (data) => {
    try {
      const res = axiosInstance.post('user/reset-password', data);

      toast.promise(res, {
        loading: 'Wait! sending verification email',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to send verification email try again'
      });
      return (await res)?.data;
    } catch (error) {
      console.log('error', error);
      return error?.response?.data;
    }
  }
);
export const forgotPasswordVerify = createAsyncThunk(
  '/user/forgot-password',
  async (data) => {
    try {
      const res = axiosInstance.post(`user/reset-password/${data[1]}`, data[0]);

      toast.promise(res, {
        loading: 'Wait! changing password',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to change password try again'
      });
      return (await res)?.data;
    } catch (error) {
      console.log('error', error);
      return error?.response?.data;
    }
  }
);
export const changeEmailVerify = createAsyncThunk(
  '/user/change-email',
  async (data) => {
    try {
      const res = axiosInstance.post(`user/change-email/${data[0]}`, data[1]);

      toast.promise(res, {
        loading: 'Wait! verifying email',
        success: (data) => {
          return data?.data?.message;
        },
        error: 'Failed to verify email try again'
      });
      return (await res)?.data;
    } catch (error) {
      console.log('error', error);
      return error?.response?.data;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAccount.fulfilled, (state, action) => {
      if (action?.payload?.data) {
        state.isLoggedIn = action?.payload?.success;
        localStorage.setItem('isLoggedIn', action?.payload?.success);
        localStorage.setItem('data', JSON.stringify(action?.payload?.data));
        localStorage.setItem(
          'role',
          JSON.stringify(action?.payload?.data?.role)
        );
        state.data = action?.payload?.data;
        state.role = action?.payload?.data?.role;
      }
    });
    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      if (action?.payload?.data) {
        state.isLoggedIn = false;
        localStorage.clear();
        state.data = {};
        state.role = 'guest';
      }
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      if (action?.payload?.data) {
        state.isLoggedIn = false;
        localStorage.clear();
        state.data = {};
        state.role = 'guest';
      }
    });
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      if (action?.payload?.data) {
        state.isLoggedIn = action?.payload?.success;
        localStorage.setItem('isLoggedIn', action?.payload?.success);
        localStorage.setItem('data', JSON.stringify(action?.payload?.data));
        localStorage.setItem(
          'role',
          JSON.stringify(action?.payload?.data?.role)
        );
        state.data = action?.payload?.data;
        state.role = action?.payload?.data?.role;
      }
    });
    builder.addCase(updateCoverImage.fulfilled, (state, action) => {
      if (action?.payload?.data) {
        state.isLoggedIn = action?.payload?.success;
        localStorage.setItem('isLoggedIn', action?.payload?.success);
        localStorage.setItem('data', JSON.stringify(action?.payload?.data));
        localStorage.setItem(
          'role',
          JSON.stringify(action?.payload?.data?.role)
        );
        state.data = action?.payload?.data;
        state.role = action?.payload?.data?.role;
      }
    });
    builder.addCase(updateName.fulfilled, (state, action) => {
      if (action?.payload?.data) {
        state.isLoggedIn = action?.payload?.success;
        localStorage.setItem('isLoggedIn', action?.payload?.success);
        localStorage.setItem('data', JSON.stringify(action?.payload?.data));
        localStorage.setItem(
          'role',
          JSON.stringify(action?.payload?.data?.role)
        );
        state.data = action?.payload?.data;
        state.role = action?.payload?.data?.role;
      }
    });
  }
});

export default authSlice.reducer;
