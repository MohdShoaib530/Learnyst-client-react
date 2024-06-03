// File: src/pages/Support.jsx
import React from 'react';

const Support = () => {
  return (
    <div className='min-h-screen mt-20 md:mt-28 bg-gray-100 flex items-center justify-center p-4'>
      <div className='max-w-xl w-full bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4 text-center'>
          Support
        </h2>
        <p className='text-gray-600 mb-6 text-center'>
          If you have any questions or need assistance, please fill out the form
          below and our support team will get back to you shortly.
        </p>
        <form>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-gray-700 font-bold mb-2'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              className='w-full px-3 py-2 border bg-white border-black  rounded-lg '
              required
              placeholder='Enter your name here'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-gray-700 font-bold mb-2'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              className='w-full px-3 py-2 border bg-white border-black  rounded-lg'
              required
              placeholder='Enter your email here'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='message'
              className='block text-gray-700 font-bold mb-2'
            >
              Message
            </label>
            <textarea
              id='message'
              className='w-full px-3 py-2 border bg-white border-black  rounded-lg'
              rows='4'
              required
              placeholder='Enter your message here'
            ></textarea>
          </div>
          <div className='text-center'>
            <button
              type='submit'
              className='w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Support;
