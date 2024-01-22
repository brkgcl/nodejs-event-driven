import React from 'react';
// import { useGetUserMutation } from '../redux/api/authApi';
import { ToastContainer } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

const GooglePage = () => {
  return (
    <div className="bg-yellow-400 w-full h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="bg-yellow-500 flex items-center justify-center p-16">
        <button
          // onClick={onSubmitHandler}
          className="flex items-center justify-center p-4 bg-indigo-600 rounded-lg"
        >
          Google
        </button>
      </div>
    </div>
  );
};

export default GooglePage;
