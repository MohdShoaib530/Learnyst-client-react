import './App.css';

import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

import HomeLayout from './layouts/HomeLayout';

function App() {
  return (
    <HomeLayout className='flex flex-col items-center justify-center w-full'>
      <Toaster />
      <Outlet />
    </HomeLayout>
  );
}

export default App;
