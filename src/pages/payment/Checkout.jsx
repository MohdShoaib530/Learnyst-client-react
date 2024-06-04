import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { refreshAccessToken } from '../../redux/slices/authSlice.js';
import {
  getRazorpayKey,
  getRazorpaySubsId,
  paymentVerify
} from '../../redux/slices/paymentSlice.js';

function Checkout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const paymentDetails = {
    razorpay_payment_id: '',
    razorpay_subscription_id: '',
    razorpay_signature: ''
  };
  const dispatch = useDispatch();
  const razorpayKey = useSelector((state) => state?.payment?.key);
  const subscription_id = useSelector(
    (state) => state?.payment?.subscription_id
  );
  console.log('razorpayKeysss', razorpayKey, subscription_id);
  const email = useSelector((state) => state?.auth?.data?.email);

  async function handleSubscription(e) {
    e.preventDefault();
    console.log('razorpayKey', razorpayKey, subscription_id);
    if (!razorpayKey || !subscription_id) {
      toast.error('Something went wrong');
    }
    const options = {
      key: razorpayKey,
      amount: '1',
      currency: 'INR',
      subscription_id: subscription_id,
      name: 'codemon pvt. ltd.',
      description: 'Test Transaction',
      prefill: {
        email: email,
        contact: '9569668078'
      },
      theme: {
        color: '#3399cc'
      },
      handler: async function (resp) {
        try {
          const response = await resp;

          paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
          paymentDetails.razorpay_signature = response.razorpay_signature;
          paymentDetails.razorpay_subscription_id =
            response.razorpay_subscription_id;

          const res = await dispatch(paymentVerify(paymentDetails));
          toast.success('payment successful');

          if (res?.payload?.success) {
            navigate('/checkout/success');
          } else {
            navigate('/chekcout/failure');
          }
        } catch (error) {
          navigate('/chekcout/failure');
        }
      }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  async function load() {
    setLoading(true);
    const res = await dispatch(refreshAccessToken());
    console.log('res', res);
    const key = await dispatch(getRazorpayKey());
    console.log('key', key);
    await dispatch(getRazorpaySubsId());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return !loading ? (
    <form
      onSubmit={handleSubscription}
      className='min-h-[90vh] flex items-center justify-center '
    >
      <div className='w-80 h-[26rem] mt-16 flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative'>
        <h1 className='bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl0lg rounded-tr-lg'>
          Subscription Bundle
        </h1>
        <div className='px-4 space-y-5 text-center'>
          <p className='text-[17px]'>
            This purchase will allow you to access all available course of our
            platform for{' '}
            <span className='text-yellow-500 font-bold'>
              <br />1 Year duration
            </span>{' '}
            All the existing and new launched courses will be also available
          </p>

          <p className='flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500'>
            <CurrencyRupeeIcon />
            <span>499</span> only
          </p>
          <div className=''>
            <p>100% refund on cancellation</p>
            <p>* Terms and conditions applied *</p>
          </div>
          <button
            type='submit'
            className='bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2'
          >
            Buy now
          </button>
        </div>
      </div>
    </form>
  ) : (
    <h1 className='flex items-center justify-center text-3xl h-screen'>
      Loading Payment Details...
    </h1>
  );
}

export default Checkout;
