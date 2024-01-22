import { toast } from 'react-toastify';
import { loqOut, setToken } from '../features/userSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// const authUrl = fetch(process.env.AUTH_SERVICE_URI)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error('Network response bla bla');
//     }
//     return response.json();
//   })
//   .then((data) => console.log('gelen data fetch :', data))
//   .catch((error) => console.log('fetch hata error :', error));

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:4000',
  credentials: 'include',
  headers: {
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
  },
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    console.log('token: ' + token);
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("gelen url :", process.env.REACT_APP_AUTH_BACKEND_URI);
  if (result.error) {
    if (result?.error?.originalStatus === 401) {
      console.log('sending reflesh token');

      const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
      console.log('reflesh result: ', refreshResult);

      if (refreshResult?.data) {
        api.dispatch(setToken(refreshResult.data));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(loqOut());
      }
    }
    result.error.data.errors.forEach((err) => {
      console.log('error message baseQuery: ', err.message);
      toast.error(err.message);
    });
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
