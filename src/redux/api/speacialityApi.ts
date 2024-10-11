import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"


const speacialityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSpecialty: build.mutation({
      query:(data)=>({
        url:'/specialties',
        method:"POST",
        contentType:"multipart/form-data",
        data
      }),
      invalidatesTags:[tagTypes.speciality]
    }),
   getSpecialty: build.query({
      query:()=>({
        url:'/specialties',
        method:"GET",
      
      }),
      providesTags: [tagTypes.speciality]
    }),
    
   deleteSpecialty: build.mutation({
      query:(id)=>({
        url:`/specialties/${id}`,
        method:"DELETE",
      
      }),
      invalidatesTags:[tagTypes.speciality]
    }),
  }),
  
})

export const { 
  useCreateSpecialtyMutation,
  useGetSpecialtyQuery ,
  useDeleteSpecialtyMutation

} = speacialityApi