import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Cards from '../components/Cards';
import CarouselHomePage from '../components/CarouselHomePage';
import OfflineCentres from '../components/OfflineCentres.jsx';
import OurServicesCard from '../components/OurServicesCard';
import examCategoriesData from '../constants/examCategoriesData.js';
import offlineCentersData from '../constants/offlineCentersData.js';
import ourServicesData from '../constants/ourServicesData.js';
import { ourExcellnceData } from '../constants/ourServicesData.js';
import { getUserById, refreshAccessToken } from '../redux/slices/authSlice.js';

function HomePage() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state?.auth);
  const [visibleCountExams, setvisibleCountExams] = useState(6);
  const [visibleCountCentre, setvisibleCountCentre] = useState(8);

  const handleShowMoreExams = () => {
    setvisibleCountExams(examCategoriesData.length);
  };
  const handleShowLessExams = () => {
    setvisibleCountExams(6);
  };
  const handleShowMoreCentre = () => {
    setvisibleCountCentre(offlineCentersData.length);
  };
  const handleShowLessCentre = () => {
    setvisibleCountCentre(8);
  };

  return (
    <div className='homepage relative mt-12 mb-10 md:mt-16 w-full flex flex-col items-center justify-center gap-y-3'>
      <div className='main-landing-page relative w-full flex flex-col items-center justify-center gap-y-3'>
        <div className=''>
          <CarouselHomePage />
        </div>
        <div className=' mt-10 flex flex-col items-center justify-center w-full'>
          <div className=' flex flex-col items-center justify-center gap-3 font-semibold px-3 flex-wrap'>
            <h1 className='text-black text-3xl md:text-4xl'>
              Bharat’s{' '}
              <span className='text-blue-700 '>Biggest & Most Trusted</span>{' '}
              Educational Platform
            </h1>
            <h1 className=' text-black text-xl md:text-xl'>
              Unlock your potential by signing up with Learnyst. Revolutionize
              learning with <br />
              <span className=' animate-pulse text-blue-600'>
                AI driven education at Affordible price. {'  '}
              </span>
            </h1>
            {isLoggedIn ? (
              <Link
                to='/courses'
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition'
              >
                Explore Courses
              </Link>
            ) : (
              <Link
                to='/signup'
                className='px-8 py-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition'
              >
                Sign Up Now
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className='OurServices flex flex-col items-center justify-center gap-5 mt-10 mx-3'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-5'>
          {ourServicesData.map((card, index) => (
            <OurServicesCard
              key={index}
              image={card.image}
              title={card.title}
              data={card.data}
            />
          ))}
        </div>
        <div className=' bg-black w-full h-[1px]'></div>
      </div>
      <div className='Exam-Categories relative w-full flex flex-col items-center justify-center gap-y-8 mt-10'>
        <div className='flex flex-col gap-y-2 px-3'>
          <h1 className='text-3xl md:text-4xl font-semibold'>
            Exam Categories
          </h1>
          <p className=' font-semibold'>
            Learnyst is preparing students for many exam categories. Scroll down
            to find the one you are preparing for
          </p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-10 w-full px-2 items-center justify-center'>
            {examCategoriesData
              .slice(0, visibleCountExams)
              .map((exam, index) => (
                <Cards
                  key={index}
                  image={exam.image}
                  title={exam.title}
                  data={exam.data}
                  button1={'View Courses'}
                  button2={'Explore Category'}
                />
              ))}
          </div>
          <div className='flex items-center justify-center'>
            {visibleCountExams < examCategoriesData.length && (
              <button
                onClick={handleShowMoreExams}
                className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition'
              >
                Show More
              </button>
            )}
            {visibleCountExams >= examCategoriesData.length && (
              <button
                onClick={handleShowLessExams}
                className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition'
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='paathshaala centers shadow-black shadow-2xl bg-gray-800 text-gray-300 w-[95vw] rounded-3xl flex flex-col items-center justify-center gap-y-3 mt-10 p-3'>
        <div className='bg-gray-100 text-gray-950 mt-2 rounded-2xl py-1 px-6 font-semibold '>
          <h1 className='text-xl md:text-2xl'>
            Explore <span className='text-blue-700'>Tech-Enabled</span> Offline
            Paathshaala Centres
          </h1>
          <p className='md:text-xl'>
            Creating new <span className='text-blue-700'>benchmarks</span> in
            learning experiences
          </p>
        </div>
        <div className='w-full items-center justify-center flex flex-col gap-y-3'>
          <div className='bg-gray-100 text-gray-950 rounded-2xl py-1 px-6 font-semibold'>
            <h1>Find Paathshaala Centre in your city</h1>
            <p>
              Available in <span className='text-blue-700'>12</span> cities
            </p>
          </div>
          <div className='grid grid-cols-2 lg:grid-cols-4 mx-auto gap-4 w-full px-2 items-center justify-center'>
            {offlineCentersData
              .slice(0, visibleCountCentre)
              .map((centre, index) => (
                <OfflineCentres
                  key={index}
                  image={centre.image}
                  data={centre.city}
                />
              ))}
          </div>
          <div className='flex items-center justify-center'>
            {visibleCountCentre < offlineCentersData.length && (
              <button
                onClick={handleShowMoreCentre}
                className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition'
              >
                Show More
              </button>
            )}
            {visibleCountCentre >= offlineCentersData.length && (
              <button
                onClick={handleShowLessCentre}
                className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition'
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='Our-Excellence flex flex-col items-center justify-center gap-5 mt-10 mx-3'>
        <div>
          <h1 className='text-xl md:text-2xl'>
            A Platform Trusted by Students Worldwide
          </h1>
          <p className='md:text-xl'>
            Don&apos;t Just Take Our Word for It. Delve into the Numbers and
            Witness the Excellence for Yourself!
          </p>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-5 '>
          {ourExcellnceData.map((card, index) => (
            <OurServicesCard
              className={
                'transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105'
              }
              key={index}
              image={card.image}
              title={card.title}
              data={card.data}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
