import { SerializedError } from '@reduxjs/toolkit';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from 'store';

const baseUrl = import.meta.env.VITE_SERVER_URL;
type TBaseQuery = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError | SerializedError>


const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: ((headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  })
})


const baseQuery: TBaseQuery = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions)
  const tokenExpired = result?.error?.status === 403
  if (tokenExpired) {
    console.log('constbaseQuery:TBaseQuery= ~ tokenExpired', tokenExpired)
    const refresh = await rawBaseQuery('/auth/refresh', api, extraOptions)
    if (refresh?.error) return refresh
    result = await rawBaseQuery(args, api, extraOptions)
  }
  return result
}


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: []
})  