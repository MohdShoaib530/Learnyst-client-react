import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { refreshAccessToken } from '../../redux/slices/authSlice.js';
import { deleteLecture, getLectures } from '../../redux/slices/lectureSlice.js';

function DisplayLectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = useLocation();
  console.log('state', state);
  const { lectures } = useSelector((state) => state?.lecture);
  console.log('lectures', lectures);
  const role = useSelector((state) => state?.auth?.data?.role);

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId) {
    const res = await dispatch(
      deleteLecture({ courseId: courseId, lectureId: lectureId })
    );
    console.log('res', res.payload.message);
    if (res.payload.message === 'jwt expired') {
      await dispatch(refreshAccessToken());
    }
    await dispatch(getLectures(state._id));
  }
  async function getLecturesAll() {
    const res = await dispatch(getLectures(state._id));
    console.log('res', res);
    if (res.payload.message === 'jwt expired') {
      await dispatch(refreshAccessToken());
    }
  }

  useEffect(() => {
    getLecturesAll();
  }, []);

  return (
    <div className='flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-wihte mx-[5%] w-full'>
      <div className='text-center text-2xl font-semibold text-yellow-500 mt-8'>
        Course Name: {state?.title}
      </div>

      {lectures && lectures.length > 0 ? (
        <div className='flex justify-center gap-10 lg:gap-1 flex-col lg:flex-row'>
          {/* left section for playing videos and displaying course details to admin */}
          <div className='space-y-5 p-2 rounded-lg w-11/12 lg:w-5/12 shadow-[0_0_10px_black]'>
            <video
              src={lectures && lectures[currentVideo]?.lecture?.secure_url}
              className='object-fill rounded-tl-lg rounded-tr-lg w-full'
              controls
              disablePictureInPicture
              controlsList='nodownload'
            ></video>
            <div>
              <h1>
                <span className='text-yellow-500'> Title: </span>
                <span className=''>
                  {lectures && lectures[currentVideo]?.title}
                </span>
              </h1>
              <p>
                <span className='text-yellow-500 line-clamp-4'>
                  Description:{' '}
                </span>
                <span className=''>
                  {lectures && lectures[currentVideo]?.description}
                </span>
              </p>
            </div>
          </div>

          {/* right section for displaying list of lectres */}
          <ul className='lg:w-5/12 p-2 rounded-lg w-11/12 shadow-[0_0_10px_black] space-y-4'>
            <li className='font-semibold text-xl text-yellow-500 flex items-center justify-between'>
              <p>Lectures list</p>
              {role === 'ADMIN' && (
                <button
                  onClick={() =>
                    navigate('/course/add-lecture', { state: { ...state } })
                  }
                  className='btn btn-primary px-2 py-1 rounded-md font-semibold text-sm'
                >
                  Add new lecture
                </button>
              )}
            </li>
            {lectures &&
              lectures.map((lecture, idx) => {
                return (
                  <li className='space-y-2 text-gray-200' key={lecture._id}>
                    <p className='cursor-pointer'>
                      <span className='btn btn-outline btn-info btn-sm'>
                        Lecture {idx + 1} :{' '}
                      </span>{' '}
                      <span className='btn btn-outline btn-primary btn-sm'>
                        {lecture?.title}
                        {''}
                      </span>{' '}
                      <span
                        onClick={() => setCurrentVideo(idx)}
                        className='btn btn-success btn-sm'
                      >
                        Play
                      </span>
                    </p>
                    {role === 'ADMIN' && (
                      <button
                        onClick={() =>
                          onLectureDelete(state?._id, lecture?._id)
                        }
                        className='btn-accent btn px-2 py-1 rounded-md font-semibold text-sm'
                      >
                        Delete lecture
                      </button>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      ) : (
        role === 'ADMIN' && (
          <button
            onClick={() =>
              navigate('/course/add-lecture', { state: { ...state } })
            }
            className='btn btn-primary px-2 py-1 rounded-md font-semibold text-sm'
          >
            Add new lecture
          </button>
        )
      )}
    </div>
  );
}

export default DisplayLectures;
