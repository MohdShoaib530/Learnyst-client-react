import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { emailVerificationStatus } from '../../redux/slices/authSlice';

function EmailVerificationStatus() {
  const navigate = useNavigate();
  const { statusToken } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const verifyEmail = async () => {
    setLoading(true);
    try {
      await dispatch(emailVerificationStatus(statusToken));
      navigate('/signin');
    } catch (error) {
      console.error(error);
      navigate('/signin');
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return !loading ? (
    <div className='flex flex-col items-center justify-center min-h-screen w-full px-3 md:w-[60vw] gap-y-3'>
      <div className='card w-96 shadow-xl hover:shadow-2xl border border-black'>
        <div className='card-body'>
          <h2 className='card-title'>Email Verified Successfully!</h2>
          <p>
            Welcome! Your email has been verified successfully. You can now log
            in and start using your account.
          </p>
          <div className='card-actions justify-end'>
            <button className='btn btn-primary'>LOGIN</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1 className='h-screen flex items-center justify-center text-2xl md:text-3xl'>
      Loading...
    </h1>
  );
}

export default EmailVerificationStatus;
