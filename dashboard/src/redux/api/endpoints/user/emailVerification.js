import { apiSlice } from '../../ApiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendVerificationMail: builder.mutation({
      query: () => ({
        url: '/user/email/send-verify-mail',
        method: 'GET',
      }),
    }),

    emailVerification: builder.mutation({
      query: (token) => ({
        url: `/user/email/verify-email/${token}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useSendVerificationMailMutation, useEmailVerificationMutation } =
  userApiSlice;
