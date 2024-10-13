
import { baseApi } from "./baseApi"


const speacialityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getuser: build.query({
      query:(data)=>({
        url:'/user/me',
        method:"GET",
        data
      }),
      
    }),

  }),
  
})

export const { 
  useGetuserQuery


} = speacialityApi