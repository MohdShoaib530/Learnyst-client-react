import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  payment: {
    razorpay_payment_id: '',
    razorpay_subscription_id: '',
    razorpay_signature: ''
  }
};

export const getRazorpayKey = createAsyncThunk(
  '/getRazorpayKey',
  async (data) => {
    try {
      const res = axiosInstance.post('', data);

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
  }
);
export const getRazorpaySubsId = createAsyncThunk('', async (data) => {
  try {
    const res = axiosInstance.post('/razorapay/subsid', data);

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
export const paymentVerify = createAsyncThunk(
  '/payment/verify',
  async (data) => {
    try {
      const res = axiosInstance.post('/payment/verify', data);

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
  }
);
