import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';


const ProtectedLayout = () => {
const userAuth = useSelector((state) => state.user.userAuth);

  if (!userAuth) {
    return <Navigate to="/" replace />;
  }

  return(
        <>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
          <Header/>
          <Outlet/>
          <Footer/>
        </>
    )
};

export default ProtectedLayout;