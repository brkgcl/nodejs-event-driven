// import React, { useEffect, useState } from 'react';

import { useEffect } from 'react';
import Loading from '../../../components/Loading';
import { useNavigate } from 'react-router-dom';

import { useGetTokenMutation } from '../../../redux/api/endpoints/auth/get_token';
// import { Navigate, useLocation, useNavigate } from 'react-router-dom';
// import Loading from '../../../components/Loading';

const LoginCallback = () => {
  const [getToken, { isSuccess, isLoading, isError }] = useGetTokenMutation();
  const navigate = useNavigate();

  useEffect(() => {
    async function loginCallback() {
      await getToken();
    }
    loginCallback();
  }, [getToken]);

  useEffect(() => {
    if (isError) {
      navigate('/auth/login');
    }

    if (isSuccess) {
      navigate('/profile');
    }
  }, [isLoading, isError, isSuccess, navigate]);

  return <Loading />;
};

export default LoginCallback;

/**
  // // const [isLogin, setIsLogin] = useState(false);
  // const isLogin = false;
  // // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   async function getCallbackToken() {
  //     await getToken();
  //   }
  //   getCallbackToken();
  // });
  // async function getCallbackToken() {
  //   await getToken();
  // }
  // getCallbackToken();

  // useEffect(() => {
  //   if (isSuccess) {
  //     setIsLogin(true);
  //   }

  //   if (isError) {
  //     navigate('/auth/login');
  //   }
  // }, [isLoading, isError, isSuccess, navigate]);
  // return isLogin === true ? (
  //   <Navigate to="/profile" state={{ from: location }} replace />
  // ) : (
  //   <Loading />
  // );
 */
