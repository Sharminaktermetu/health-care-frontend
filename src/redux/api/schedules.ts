
import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"
import { TMeta } from "@/types"


const schedulesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSchedules: build.mutation({
      query:(data)=>({
        url:'/schedule',
        method:"POST",
        contentType:"multipart/form-data",
        data
      }),
      invalidatesTags:[tagTypes.schedules]
    }),

   getSchedules: build.query({
      query:(arg: Record<string,any>)=>({
        url:'/schedule',
        method:"GET",
      params:arg
      }),
      transformResponse:(response:[], meta:TMeta)=>({
        scheduless: response,
        meta
      }),

      providesTags: [tagTypes.schedules]
    }),

   deleteSchedules: build.mutation({
      query:(id)=>({
        url:`/schedule/${id}`,
        method:"DELETE",
      
      }),
      invalidatesTags:[tagTypes.schedules]
    }),
  }),
  
})

export const { 
 useCreateSchedulesMutation,
 useGetSchedulesQuery,
 useDeleteSchedulesMutation

} = schedulesApi