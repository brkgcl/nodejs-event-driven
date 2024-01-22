import { setToken } from '../../../features/userSlice';
import { apiSlice } from '../../ApiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credantials) => ({
        url: '/auth/local/register',
        method: 'POST',
        body: credantials,
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

export const { useRegisterMutation } = authApiSlice;
