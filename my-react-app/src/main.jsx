import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login, { action as LoginAction } from './components/inscription/login/Login';
import Register from './components/inscription/register/Register';
import Contact from './components/pages/contact/Contact';
import SingleCourse from './components/pages/course-page/singleCourse';
import CoursePage from './components/pages/courses/allCourses/CoursePage';
import Doctorat from './components/pages/courses/studentCourses/Doctorat';
import Eleve from './components/pages/courses/studentCourses/Eleve';
import Etudiant from './components/pages/courses/studentCourses/Etudiant';
import Professionnel from './components/pages/courses/studentCourses/Professionnel';
import ForgotPassword from './components/pages/ForgotPassword';
import Photo from './components/pages/galerie/photo/Photo';
import Video from './components/pages/galerie/video/Video';
import Nformation from './components/pages/homeDashboard/add formation/Nformation';
import Nformation2, { loader as Nformation2Loader } from './components/pages/homeDashboard/add formation/Nformation2';
import DUformation from './components/pages/homeDashboard/delup/DUformation';
import InscriptionDash from './components/pages/homeDashboard/inscription/InscriptionDash';
import UtiInsc from './components/pages/homeDashboard/inscription/UtiInsc';
import PVadd from './components/pages/homeDashboard/photovideo/PVadd';
import HomeDash from './components/pages/homeDashboard/statistiques/HomeDash';
import Home from './components/pages/homePage/Home';
import Presentation from './components/pages/presentation/Presentation';
import ResetPasswordForm from './components/pages/ResetPassword';
import VerifyPage from './components/pages/Verify';
import PrivateRoute from './components/PrivateRoute';
import { AppProvider } from './context';
import Success from "../src/components/success purchase/Success"
import Failure from "../src/components/failure purchase/Failure"
import './index.css';
const router = createBrowserRouter([
  {
    index: true,
    element: <Home/>
  },
  {
    path: '/contact',
    element: <Contact/>
  },
  {
    path: '/sign_in',
    element: <Login/>,
    action:LoginAction,
  },
  {
    path: '/sign_up',
    element: <Register/>
  },
  {
    path: '/cours',
    element: <CoursePage/>
  },
  {
    path: '/cours/élève',
    element: <Eleve/>
  },
  {
    path: '/cours/étudiant',
    element: <Etudiant/>
  },
  {
    path: '/cours/doctorat',
    element: <Doctorat/>
  },
  {
    path: '/cours/professionnel',
    element: <Professionnel/>
  },
  {
    path: '/photo',
    element: <Photo/>
  },
  {
    path: '/success',
    element: <Success/>,
    },
    {
      path: '/failure',
      element: <Failure/>,
      },
  {
    path: '/video',
    element: <Video/>
  },
  {
    path: 'formation/course/:id',
    element: <SingleCourse/>
  },
  {
    path: '/ajouteformation',
    element: <PrivateRoute><Nformation/></PrivateRoute>
  },
  {
    path: '/ajouteformation/:id',
    element: <PrivateRoute> <Nformation2/> </PrivateRoute>,
    loader:Nformation2Loader,
  },
  {
    path: '/user/verify-email',
    element: <VerifyPage/>
  },
  {
    path: '/user/reset-password',
    element: <ResetPasswordForm/>
  },
  {
  path:'/forgot-password',
  element: <ForgotPassword/>
},
  {
    path: '/parametres',
    element: <PrivateRoute><DUformation/></PrivateRoute>
  },
  {
    path: '/inscription',
    element:<PrivateRoute><InscriptionDash/></PrivateRoute>
  },
  {
    path: '/presentation',
    element: <Presentation/>
  },
  {
    path: '/inscription/all_users',
    element: <UtiInsc/>
  },
  {
    path: '/photo-video',
    element:<PrivateRoute><PVadd/></PrivateRoute>
  },
  {
    path: '/statistique',
    element:<PrivateRoute><HomeDash/></PrivateRoute>
  }

]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
    <ToastContainer position='top-center'/>
  </React.StrictMode>
);