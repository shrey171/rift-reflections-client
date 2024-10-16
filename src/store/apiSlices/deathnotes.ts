import { apiSlice } from "./_createApi"
const baseUrl = '/deathnotes'

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    newDeathNote: build.mutation({
      query: body => ({
        url: baseUrl,
        method: 'POST',
        body
      }),
      invalidatesTags: ['deathnote']
    }),
    editNotes: build.mutation({
      query: ({ id, ...body }) => ({
        url: `${baseUrl}/${id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['deathnote']
    }),
    getDeathNotes: build.query<any, void>({
      query: () => baseUrl,
      providesTags: ['deathnote']
    }),

  }),
  overrideExisting: false,
})


export const {
  useNewDeathNoteMutation,
  useEditNotesMutation,
  useGetDeathNotesQuery
} = extendedApi