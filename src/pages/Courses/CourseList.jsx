import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CourseCard from '../../components/CourseCard.jsx';
import { getAllCourses } from '../../redux/slices/courseSlice';

function AllCourses() {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  async function fetchCourses() {
    const res = await dispatch(getAllCourses());
    console.log(res);
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className='flex flex-col w-full pt-24 pb-10  text-center  items-center justify-center'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-xl md:text-3xl font-bold'>
          Explore Our All Courses Created By{' '}
          <span className='text-yellow-500 text-xl md:text-3xl'>
            Industry Experts
          </span>
        </h1>
        <h1 className=' text-2xl'>Courses are well structured</h1>
      </div>
      <div className='flex flex-wrap w-full pt-5 md:px-16 px-4 gap-4 items-center justify-evenly'>
        {courseData?.map((course) => {
          return <CourseCard data={course} key={course.createdAt} />;
        })}
      </div>
    </div>
  );
}

export default AllCourses;
