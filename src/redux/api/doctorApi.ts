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

   singleDoctor: build.query({
      query:(id)=>({
        url:`/doctor/${id}`,
        method:"GET",
      
      }),
      providesTags:[tagTypes.doctor]
    }),
   updateSingleDoctor: build.mutation({
      query:(data)=>({
        url:`/doctor/${data.id}`,
        method:"PATCH",
      data:data.body
      }),
      invalidatesTags:[tagTypes.doctor]
    }),
    createDoctorSchedules: build.mutation({
      query:(data)=>({
        url:'/doctor-schedule',
        method:"POST",
        data
      }),
      invalidatesTags:[tagTypes.doctor]
    }),
    getDoctorSchedules: build.query({
      query:(arg: Record<string,any>)=>({
        url:'/doctor-schedule',
        method:"GET",
      params:arg
      }),
      transformResponse:(response:[], meta:TMeta)=>({
        schedules: response,
        meta
      }),

      providesTags: [tagTypes.doctor]
    }),

    deleteDoctorSchedule: build.mutation({
      query:(id)=>({
        url:`/doctor-schedule/${id}`,
        method:"DELETE",
      
      }),
      invalidatesTags:[tagTypes.doctor]
    }),
  }),
  
})

export const { 
 useCreateDoctorMutation,
 useGetDoctorQuery,
 useDeleteDoctorMutation,
useSingleDoctorQuery,
 useUpdateSingleDoctorMutation,
 useCreateDoctorSchedulesMutation,
 useGetDoctorSchedulesQuery,
 useDeleteDoctorScheduleMutation

} = doctorApi