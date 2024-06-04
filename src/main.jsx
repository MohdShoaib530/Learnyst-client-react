import './index.css';
// Import Roboto font weights
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import NotFound from './components/NotFound.jsx';
import AboutUs from './pages/About.jsx';
import ContactUs from './pages/Contact.jsx';
import CourseCreate from './pages/Courses/CourseCreate.jsx';
import CourseDetails from './pages/Courses/CourseDetails.jsx';
import AllCourses from './pages/Courses/CourseList.jsx';
import AddNewLecture from './pages/dashboard/AddLecture.jsx';
import DisplayLectures from './pages/dashboard/DisplayLectures.jsx';
import HomePage from './pages/HomePage.jsx';
import Checkout from './pages/payment/Checkout.jsx';
import CheckoutFailure from './pages/payment/CheckoutFailure.jsx';
import CheckoutSuccess from './pages/payment/CheckoutSuccess.jsx';
import SignIn from './pages/SignIn.jsx';
import Signup from './pages/Signup.jsx';
import Support from './pages/Support.jsx';
import ChangeEmailVerify from './pages/User/ChangeEmailVerify.jsx';
import ChangePassword from './pages/User/ChangePassword.jsx';
import EditProfile from './pages/User/Edit Profile.jsx';
import EmailVerification from './pages/User/EmailVerification.jsx';
import EmailVerificationStatus from './pages/User/EmailVerified.jsx';
import ForgotPassword from './pages/User/ForgotPassword.jsx';
import MyCourses from './pages/User/MyCourses.jsx';
import PasswordVerification from './pages/User/PasswordVerification.jsx';
import Profile from './pages/User/Profile.jsx';
import store from './redux/store.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/user/email-verification',
        element: <EmailVerification />
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/*',
        element: <NotFound />
      },
      {
        path: '/user/profile',
        element: <Profile />
      },
      {
        path: '/confirm-status/:statusToken',
        element: <EmailVerificationStatus />
      },
      {
        path: '/user/change-password',
        element: <ChangePassword />
      },
      {
        path: '/user/edit-profile',
        element: <EditProfile />
      },
      {
        path: '/courses',
        element: <AllCourses />
      },
      {
        path: '/course/description/',
        element: <CourseDetails />
      },
      {
        path: '/course/create/',
        element: <CourseCreate />
      },
      {
        path: '/my-courses',
        element: <MyCourses />
      },
      {
        path: '/support',
        element: <Support />
      },

      {
        path: '/about-us',
        element: <AboutUs />
      },
      {
        path: '/contact-us',
        element: <ContactUs />
      },
      {
        path: '/checkout',
        element: <Checkout />
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      },
      {
        path: '/reset-password/:resetToken',
        element: <PasswordVerification />
      },
      {
        path: '/change-email/:emailToken',
        element: <ChangeEmailVerify />
      },
      {
        path: '/course/displaylectures',
        element: <DisplayLectures />
      },
      {
        path: '/course/add-lecture',
        element: <AddNewLecture />
      },
      {
        path: '/checkout/success',
        element: <CheckoutSuccess />
      },
      {
        path: '/chekcout/failure',
        element: <CheckoutFailure />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <Toaster />
      <App />
    </RouterProvider>
  </Provider>
);
