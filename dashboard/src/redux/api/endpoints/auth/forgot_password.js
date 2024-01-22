import { apiSlice } from '../../ApiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: '/auth/forgat-password',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useForgotPasswordMutation } = authApiSlice;
