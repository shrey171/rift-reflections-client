import { apiSlice } from "./_createApi"
const baseUrl = import.meta.env.VITE_SERVER_URL;

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getChampions: build.query<any, void>({
      query: () => `${baseUrl}/champions`,
      transformResponse: (response: any) =>
        Object.keys(response)?.map(key => ({
          label: response[key].name,
          value: key,
        }))
    }),
  }),
  overrideExisting: false,
})


export const { useGetChampionsQuery } = extendedApi