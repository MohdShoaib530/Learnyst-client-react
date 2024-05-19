import './App.css';

import { Outlet } from 'react-router-dom';

import HomeLayout from './layouts/HomeLayout';

function App() {
  return (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  );
}

export default App;
