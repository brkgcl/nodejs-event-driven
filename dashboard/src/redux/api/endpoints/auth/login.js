import { setToken } from '../../../features/userSlice';
import { apiSlice } from '../../ApiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/local/login',
        method: 'POST',
        body: { ...credentials },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(setToken((await queryFulfilled).data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
