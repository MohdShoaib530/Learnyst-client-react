import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  deleteAccount,
  getUserById,
  refreshAccessToken,
  updateAvatar,
  updateCoverImage
} from '../../redux/slices/authSlice';

function Profile() {
  const userData = useSelector((state) => state?.auth);
  const [filePreview, setFilePreview] = useState({
    coverImage: null,
    avatar: null
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function previewImage(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const id = e.target.id;

    if (file) {
      setFilePreview((prevState) => ({
        ...prevState,
        [id]: file
      }));

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        if (id === 'coverImage') {
          setFilePreview((prevState) => ({
            ...prevState,
            coverImagePreview: fileReader.result
          }));
        } else if (id === 'avatar') {
          setFilePreview((prevState) => ({
            ...prevState,
            avatarPreview: fileReader.result
          }));
        }
      };
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!filePreview.coverImage && !filePreview.avatar) {
      return toast.error('Please select an image to upload');
    }

    if (filePreview.coverImage) {
      const form = new FormData();
      form.append('coverImage', filePreview.coverImage);
      try {
        const response = await dispatch(updateCoverImage(form));
        console.log('response', response);
        if (
          response?.payload?.message === 'jwt expired' ||
          response.payload === 'jwt malformed'
        ) {
          const res = await dispatch(refreshAccessToken());
          console.log('res', res);
        }
        setFilePreview({
          coverImage: null,
          coverImagePreview: ''
        });
      } catch (error) {
        setFilePreview({
          coverImage: null,
          coverImagePreview: ''
        });
      }
    }

    if (filePreview.avatar) {
      const form2 = new FormData();
      form2.append('avatar', filePreview.avatar);
      try {
        const response = await dispatch(updateAvatar(form2));
        console.log('response', response);
        if (
          response?.payload?.message === 'jwt expired' ||
          response.payload === 'jwt malformed'
        ) {
          const res = await dispatch(refreshAccessToken());
          console.log('res', res);
        }
        setFilePreview({
          avatar: null,
          avatarPreview: ''
        });
      } catch (error) {
        setFilePreview({
          avatar: null,
          avatarPreview: ''
        });
      }
    }
  }

  function onCancel(e) {
    e.preventDefault();
    setFilePreview({
      coverImage: null,
      coverImagePreview: '',
      avatar: null,
      avatarPreview: ''
    });
  }

  const cancelSubscription = async () => {
    try {
      await dispatch(getUserById());
      navigate('/user/profile');
    } catch (error) {
      toast.error('Cannot cancel subscription');
    }
  };

  const deleteUserAccount = async () => {
    try {
      const response = await dispatch(deleteAccount());
      if (
        response?.payload?.message === 'jwt expired' ||
        response.payload === 'jwt malformed'
      ) {
        const res = await dispatch(refreshAccessToken());
      }
      navigate('/');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className='w-full min-h-[100vh] flex flex-col items-center justify-center relative px-2'>
      <div className='relative w-full sm:w-1/2 mt-20 flex flex-col gap-2 rounded-lg border border-gray-950 shadow-2xl'>
        <img
          src={
            filePreview.coverImagePreview ||
            userData?.data?.coverImage?.secure_url
          }
          className='w-full h-32 m-auto rounded-lg'
          alt='Cover'
        />
        <label htmlFor='coverImage' className='cursor-pointer absolute right-2'>
          <EditIcon className='bg-white' />
          <input
            onChange={previewImage}
            type='file'
            id='coverImage'
            accept='image/png, image/jpeg, image/jpg'
            className='hidden relative bottom-5 w-[100%] cursor-pointer'
          />
        </label>
        <div className='absolute'>
          <img
            src={
              filePreview.avatarPreview || userData?.data?.avatar?.secure_url
            }
            className='w-32 h-32 mt-10 rounded-full border border-black'
            alt='Avatar'
          />
          <label
            htmlFor='avatar'
            className='cursor-pointer absolute right-2 bottom-6'
          >
            <EditIcon className='bg-white' />
            <input
              onChange={previewImage}
              type='file'
              id='avatar'
              accept='image/png, image/jpeg, image/jpg'
              className='hidden relative bottom-5 w-[100%] cursor-pointer'
            />
          </label>
        </div>
        {(filePreview.avatar || filePreview.coverImage) && (
          <div className='flex items-center justify-end gap-3 pr-2 '>
            <button
              onClick={onSubmit}
              className='w-fit bg-red-700 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold cursor-pointer text-center p-2'
            >
              Save Changes
            </button>
            <button
              onClick={onCancel}
              className='w-fit bg-red-700 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold cursor-pointer text-center p-2'
            >
              Cancel Changes
            </button>
          </div>
        )}
        <div className='flex flex-col mx-auto mt-10 md:mt-1'>
          <div className='flex items-end flex-row gap-2'>
            <p>Name: </p>
            <p>{userData?.data?.fullName}</p>
          </div>
          <div className='flex items-end flex-row gap-2'>
            <p>Email: </p>
            <p>{userData?.data?.email}</p>
          </div>
          <div className='flex items-end flex-row gap-2'>
            <p>Role: </p>
            <p>{userData?.role}</p>
          </div>
          <div className='flex items-end flex-row gap-2'>
            <p>Subscription: </p>
            <p>
              {userData?.data?.subscription?.status === 'active'
                ? 'Active'
                : 'Inactive'}
            </p>
          </div>
        </div>
        <div className='flex items-center justify-between gap-2 px-2'>
          <Link
            to='/user/change-password'
            className='w-1/2 bg-blue-500 text-white hover:bg-blue-700 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center'
          >
            <button>Change Password</button>
          </Link>
          <Link
            to='/user/edit-profile'
            className='w-1/2 bg-blue-500 text-white hover:bg-blue-700 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center'
          >
            <button>Edit profile</button>
          </Link>
        </div>
        {userData?.data?.subscription?.status === 'active' && (
          <button
            onClick={cancelSubscription}
            className='w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center px-2'
          >
            Cancel Subscription
          </button>
        )}
        {userData?.isLoggedIn === true && (
          <button
            onClick={deleteUserAccount}
            className='w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center px-2'
          >
            Delete Account
          </button>
        )}
        {userData?.data?.role === 'ADMIN' && (
          <button
            onClick={() => navigate('/admin/dashboard')}
            className='w-full btn-primary btn px-2'
          >
            Admin Dashboard
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
