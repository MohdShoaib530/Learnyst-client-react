import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  refreshAccessToken,
  updateEmail,
  updateName
} from '../../redux/slices/authSlice';

function EditProfile() {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const dispatch = useDispatch();

  const { avatar } = useSelector((state) => state?.auth?.data);

  const [data, setData] = useState({
    fullName: '',
    email: ''
  });

  function handleOnChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }
  function cancleEditName() {
    setIsEditingName(false);
    setData({
      fullName: ''
    });
  }
  function cancleEditEmail() {
    setIsEditingEmail(false);
    setData({
      email: ''
    });
  }

  async function changeName(e) {
    e.preventDefault();

    if (data.fullName.trim().length < 5) {
      toast.error('Name cannot be of less than 5 characters');
      return;
    }
    const response = await dispatch(updateName({ fullName: data.fullName }));
    console.log('response', response);
    if (
      response?.payload?.message === 'jwt expired' ||
      response.payload === 'jwt malformed'
    ) {
      const res = await dispatch(refreshAccessToken());
      console.log('res2', res);
    }
    setIsEditingName(false);
    setData({
      fullName: ''
    });
    console.log('hi');
  }
  async function changeEmail(e) {
    e.preventDefault();

    if (!data.email) {
      toast.error('Please fill  the fields to update');
      return;
    }
    if (
      data.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) ===
      null
    ) {
      toast.error('Please enter a valid email address');
      return;
    }
    const response = await dispatch(updateEmail({ email: data.email }));
    if (
      response?.payload?.message === 'jwt expired' ||
      response.payload === 'jwt malformed'
    ) {
      const res = await dispatch(refreshAccessToken());
    }
    setIsEditingEmail(false);
    setData({
      email: ''
    });
  }

  return (
    <div className='w-full mx-auto  flex flex-col items-center justify-center gap-y-3 pt-20 min-h-[95vh]'>
      <div className='w-fit px-10 py-4 rounded-lg border border-gray-900  flex flex-col gap-y-4 items-center justify-center'>
        <div>
          <img
            src={avatar.secure_url}
            alt=''
            className='w-28 h-28 rounded-full'
          />
        </div>
        <div>
          {isEditingEmail ? (
            <div className='flex flex-row items-center gap-2'>
              <button
                type='button'
                onClick={() => cancleEditEmail()}
                className='btn-secondary btn btn-sm'
              >
                Cancel
              </button>
              <input
                type='email'
                name='email'
                value={data.email}
                onChange={handleOnChange}
                className='input-field bg-white border border-gray-950 px-2 rounded-md text-black'
                placeholder='Enter new email'
              />
              <button
                className='btn btn-outline btn-success btn-sm'
                onClick={changeEmail}
              >
                Send Verification
              </button>
            </div>
          ) : (
            <div className='flex flex-row items-center gap-5'>
              <button
                onClick={() => setIsEditingEmail(true)}
                className='btn-primary btn btn-sm'
              >
                Change Email
              </button>
              <ContactMailIcon fontSize='larger' />
            </div>
          )}
        </div>
        <div>
          {isEditingName ? (
            <div className='flex flex-row items-center gap-2'>
              <button
                type='button'
                onClick={() => cancleEditName()}
                className='btn-secondary btn btn-sm'
              >
                Cancel
              </button>
              <input
                type='text'
                name='fullName'
                value={data.fullName}
                onChange={handleOnChange}
                className='input-field bg-white border border-gray-950 px-2 rounded-md text-black'
                placeholder='Enter new name'
              />
              <button
                className='btn btn-outline btn-success btn-sm'
                onClick={changeName}
              >
                Save
              </button>
            </div>
          ) : (
            <div className='flex flex-row items-center gap-2'>
              <button
                onClick={() => setIsEditingName(true)}
                className='btn-secondary btn-sm btn'
              >
                Change Name
              </button>
              <PersonSearchIcon sx={{ fontSize: '60' }} />
            </div>
          )}
        </div>
        <div className='flex flex-row items-center justify-center text-green-600 mt-3'>
          <Link
            to={'/user/profile'}
            className='flex flex-row items-center justify-center gap-2'
          >
            <ArrowBackIcon sx={{ fontSize: '50' }} />
            <button>Go back to profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
