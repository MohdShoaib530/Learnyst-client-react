import { Link } from 'react-router-dom';

import CarouselHomePage from '../components/CarouselHomePage';

function HomePage() {
  return (
    <div className='relative mt-12 md:mt-16 w-full flex flex-col items-center justify-center gap-y-3'>
      <div className='relative w-full flex flex-col items-center justify-center gap-y-3'>
        <div className=''>
          <CarouselHomePage />
        </div>
        <div className='mt-10 flex flex-col items-center justify-center gap-3'>
          <h1 className=' animate-pulse text-gray-300 text-3xl md:text-4xl'>
            Bharat’s{' '}
            <span className='text-blue-700'>Biggest & Most Trusted</span>{' '}
            Educational Platform
          </h1>
          <h1 className=' text-gray-300 text-xl md:text-xl'>
            Unlock your potential by signing up with Learnyst. Revolutionize
            learning with <br />
            <span className=' animate-pulse text-blue-600'>
              AI DRIVEN EDUCATION{'  '}
            </span>
          </h1>
          <button className='btn mt-5 btn-primary'>
            <Link to={'/register'}>Get Started</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
