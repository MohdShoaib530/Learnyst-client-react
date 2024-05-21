import './App.css';

import { Outlet } from 'react-router-dom';

import HomeLayout from './layouts/HomeLayout';

function App() {
  return (
    <HomeLayout className='flex flex-col items-center justify-center w-full'>
      <Outlet />
    </HomeLayout>
  );
}

export default App;
