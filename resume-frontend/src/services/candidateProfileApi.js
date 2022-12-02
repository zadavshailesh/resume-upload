import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const candidateProfileApi = createApi({
  reducerPath: 'candidateProfileApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (builder) => ({
    saveProfile: builder.mutation({
      query: (candidate) => {
        return {
          url: 'resume',
          method: 'POST',
          body: candidate,
        }
      }
    }),
    getResumeProfile:builder.query({
      query:()=>{
        return{
          url:'list',
          method:'GET'
        }
      }
    })
  }),
})

export const { useSaveProfileMutation, useGetResumeProfileQuery} = candidateProfileApi