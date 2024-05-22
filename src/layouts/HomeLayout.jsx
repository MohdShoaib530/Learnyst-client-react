import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

function HomeLayout({ children }) {
  return (
    <div className='w-full relative flex flex-col items-center justify-center '>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default HomeLayout;
