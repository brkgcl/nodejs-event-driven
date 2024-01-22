import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const register = () => {
    navigate('/register');
  };
  const login = () => {
    navigate('/login');
  };
  return (
    <div className="bg-red-400 w-full h-screen flex items-center justify-center">
      <div className="flex w-1/3 h-1/4 bg-red-500 items-center justify-center p-4 gap-3">
        <button
          onClick={login}
          className="bg-indigo-600 flex items-center justify-center p-3"
        >
          Sİgn-In
        </button>
        <button
          onClick={register}
          className="bg-indigo-600 flex items-center justify-center p-3"
        >
          Sİgn-Up
        </button>
      </div>
    </div>
  );
};

export default Home;
