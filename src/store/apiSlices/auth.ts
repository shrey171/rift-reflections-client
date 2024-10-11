import { apiSlice } from "./_createApi"
const baseUrl = '/auth'

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: credentials => ({
        url: `${baseUrl}/login`,
        method: 'POST',
        body: credentials
      })
    }),
    register: build.mutation({
      query: credentials => ({
        url: `${baseUrl}/register`,
        method: 'POST',
        body: credentials
      })
    }),
    me: build.query<any, void>({
      query: () => `${baseUrl}/me`,
    }),
    refresh: build.query<any, void>({
      query: () => `${baseUrl}/refresh`,
    }),

  }),
  overrideExisting: false,
})


export const {
  useLoginMutation,
  useMeQuery,
  useLazyMeQuery,
  useLazyRefreshQuery,
  useRegisterMutation,
} = extendedApi