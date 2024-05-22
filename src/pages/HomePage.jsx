import { useState } from 'react';
import { Link } from 'react-router-dom';

import upsc from '../assets/Courses/002e5e6e-47f1-4b21-89e0-8218ffcce066.webp';
import neet from '../assets/Courses/doctor-explain-coronavirus.svg';
import govtExam from '../assets/Courses/icons8-government.svg';
import defence from '../assets/Courses/icons8-knight-shield.svg';
import iit from '../assets/Courses/icons8-physics-188.png';
import railway from '../assets/Courses/icons8-railway-200.png';
import banking from '../assets/Courses/online-payment.svg';
import school from '../assets/Courses/school-bag (1).png';
import offlineCenters from '../assets/Icons/65d1e4cb-abf8-4bda-9f2c-49f37a714b7a.webp';
import liveImage from '../assets/Icons/165756ec-8d87-4a09-9a88-95c342adddea.webp';
import DoubtImage from '../assets/Icons/b75e0c1a-6893-4b31-8d79-f37a1c72115a.webp';
import testImage from '../assets/Icons/ee478abe-a66b-4529-a264-16b61ffb6c51.webp';
import Cards from '../components/Cards';
import CarouselHomePage from '../components/CarouselHomePage';
import OurServicesCard from '../components/OurServicesCard';

const cardData = [
  {
    image: liveImage,
    title: 'Live Classes',
    data: 'Interactive classes'
  },
  {
    image: offlineCenters,
    title: 'Offline Centers',
    data: 'Centers near you'
  },
  {
    image: testImage,
    title: 'Online Tests',
    data: 'Test series'
  },
  {
    image: DoubtImage,
    title: 'Doubt Resolution',
    data: '24x7 support'
  }
];

const examCategories = [
  {
    image: iit,
    title: 'JEE Main',
    data: 'Joint Entrance Examination'
  },
  {
    image: neet,
    title: 'NEET',
    data: 'National Eligibility cum Entrance Test'
  },
  {
    image: school,
    title: 'School Exams',
    data: 'CBSE, ICSE, State Boards'
  },
  {
    image: upsc,
    title: 'UPSC',
    data: 'Union Public Service Commission'
  },
  {
    image: govtExam,
    title: 'SSC',
    data: 'Staff Selection Commission'
  },
  {
    image: banking,
    title: 'Banking',
    data: 'Banking Exams'
  },
  {
    image: railway,
    title: 'Railway',
    data: 'Railway Exams'
  },
  {
    image: defence,
    title: 'Defence',
    data: 'Defence Exams'
  },
  {
    image: govtExam,
    title: 'State PSC',
    data: 'State Public Service Commission'
  }
];

function HomePage() {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleShowMore = () => {
    setVisibleCount(examCategories.length);
  };
  const handleShowLess = () => {
    setVisibleCount(6);
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
            <button className='mt-4 px-8 py-3 bg-blue-500 text-white rounded hover:bg-blue-700 transition'>
              <Link to={'/register'}>Get Started</Link>
            </button>
          </div>
        </div>
      </div>
      <div className='OurServices flex flex-col items-center justify-center gap-5 mt-10 mx-3'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-5'>
          {cardData.map((card, index) => (
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
            {examCategories.slice(0, visibleCount).map((exam, index) => (
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
            {visibleCount < examCategories.length && (
              <button
                onClick={handleShowMore}
                className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition'
              >
                Show More
              </button>
            )}
            {visibleCount >= examCategories.length && (
              <button
                onClick={handleShowLess}
                className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition'
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
