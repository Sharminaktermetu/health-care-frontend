import { IDoctor } from "@/types/doctor"
import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"
import { TMeta } from "@/types"


const doctorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctor: build.mutation({
      query:(data)=>({
        url:'/user/create-doctor',
        method:"POST",
        contentType:"multipart/form-data",
        data
      }),
      invalidatesTags:[tagTypes.doctor]
    }),
   getDoctor: build.query({
      query:(arg: Record<string,any>)=>({
        url:'/doctor',
        method:"GET",
      params:arg
      }),
      transformResponse:(response:IDoctor[], meta:TMeta)=>({
        doctors: response,
        meta
      }),

      providesTags: [tagTypes.doctor]
    }),

   deleteDoctor: build.mutation({
      query:(id)=>({
        url:`/doctor/soft/${id}`,
        method:"DELETE",
      
      }),
      invalidatesTags:[tagTypes.doctor]
    }),
  }),
  
})

export const { 
 useCreateDoctorMutation,
 useGetDoctorQuery,
 useDeleteDoctorMutation

} = doctorApi