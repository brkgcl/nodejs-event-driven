import { setUser } from '../../../features/userSlice';
import { apiSlice } from '../../ApiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.mutation({
      query: () => ({
        url: '/user/profile',
        method: 'GET',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(setUser((await queryFulfilled).data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useProfileMutation } = userApiSlice;
