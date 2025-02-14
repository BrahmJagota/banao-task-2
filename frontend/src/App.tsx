import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { AuthContextProvider } from './context/AuthContext'
import Login from './pages/Login'
import Posts from './pages/Posts'
// import {ImageUploadForm} from './components/UploadForm'

import Navbar from './pages/Navbar'
import SignUp from './pages/SignUp'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'

function App() {

  return (
    <AuthContextProvider>
      <BrowserRouter>
      <ConditionalNavbar />
          <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<SignUp />}/>
            <Route path='/' element={<Posts />}/>
            <Route path='/forgot-password' element={<ForgotPassword />}/>
            <Route path='/reset-password/:token' element={<ResetPassword />}/>
            {/* <Route path='upload' element={<ImageUploadForm />}/> */}

          </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}


const ConditionalNavbar = () => {
  const location = useLocation();
  
  const hideNavbarRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    /^\/reset-password\/[^/]+$/, 
  ];


  const shouldHideNavbar = hideNavbarRoutes.some((route) => {
    if (typeof route === "string") {
      return route === location.pathname; 
    } else {
      return route.test(location.pathname); 
    }
  });

  return !shouldHideNavbar ? <Navbar /> : null;
};
export default App
