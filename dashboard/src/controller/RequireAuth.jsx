import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../redux/features/userSlice';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = async () => {
  const location = useLocation();
  const token = useSelector(selectCurrentToken);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

/**
 *   // let token;
  // async function GetAccessToken() {
  //   token = useSelector(selectCurrentToken);
  //   if (!token) {
  //     token = await getToken();
  //     console.log('istenen token :', token);
  //   }
  //   return token;
  // }
  // useEffect(() => {
  //   GetAccessToken();
  // });
 */
