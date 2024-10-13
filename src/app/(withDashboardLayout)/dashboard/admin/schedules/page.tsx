"use client"

import { Box, Button, IconButton, Paper, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SchedulesModal from './components/SchedulesModal'
import { useDeleteSchedulesMutation, useGetSchedulesQuery } from '@/redux/api/schedules'
import { DataGrid, GridColDef, GridDeleteIcon } from '@mui/x-data-grid'
import { dateFormatter } from '@/utils/dateFormatter'
import dayjs from 'dayjs'
import { ISchedule } from '@/types/schedule'
import { toast } from 'sonner'

const SchedulesPage = () => {
    const [isModalOpen, setIsModalOpen] =useState<boolean>(false)
    const [allSchedule, setAllSchedule] = useState<any>([]);
    const {data,isLoading}=useGetSchedulesQuery({})
    const [deleteSchedules] =useDeleteSchedulesMutation()
    console.log(data)
    const schedules =data?.schedules;
    const meta =data?.meta;



    useEffect(() => {
      const updateData = schedules?.map((schedule:ISchedule) => {
        return {
          id: schedule?.id,
          startDate: dateFormatter(schedule.startDate),
          endDate: dateFormatter(schedule.endDate),
          startTime: dayjs(schedule?.startDate).format("hh:mm a"),
          endTime: dayjs(schedule?.endDate).format("hh:mm a"),
        };
      });
      setAllSchedule(updateData);
    }, [schedules]);


    const handleDelete = async(id :string)=>{
      try {
        const res =await deleteSchedules(id).unwrap();
        if (res?.id) {
          toast.success('Doctor deleted successfully')
        }
      
      } catch (error:any) {
        console.error(error.message)
      }
    }


    const columns: GridColDef[] = [
      { field: 'startDate', headerName: 'Start Date', flex:1},
      { field: 'endDate', headerName: 'End Date', flex:1},
      { field: 'startTime', headerName: 'Start Time',flex:1},
      { field: 'endTime', headerName: 'End Time',flex:1},
      
      { 
        field: 'action',
         headerName: 'Action',
         width: 450, 
         flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell:({row})=>{
        return (
    // add handle delete
            <IconButton  aria-label="delete" onClick={()=> handleDelete(row.id)}>
              
      <GridDeleteIcon sx={{color:'red'}} />
    </IconButton>
         
        )
      }
    },
    ];
  return (
    <Box>
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
      <Button onClick={()=>setIsModalOpen(true)}>Create Schedules</Button>
 <SchedulesModal open={isModalOpen} setOpen={setIsModalOpen}/>
 
    </Stack>
    <Paper sx={{ height: 400, width: '100%',my:3 }}>
 {
        !isLoading ?
         <DataGrid
         rows={allSchedule ?? []}
        columns={columns}
       
        sx={{ border: 0 }} 
       
      />
      : <Box>Loading.......</Box>
      }
      </Paper>
  </Box>
  )
}

export default SchedulesPage
