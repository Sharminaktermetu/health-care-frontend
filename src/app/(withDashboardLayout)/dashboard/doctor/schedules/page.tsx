'use client';
import { Box, Button, IconButton } from '@mui/material';

import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { dateFormatter } from '@/utils/dateFormatter';
import { ISchedule } from '@/types/schedule';
import dayjs from 'dayjs';

import DoctorsSchedules from './components/DoctorsSchedules';
import { useDeleteDoctorScheduleMutation, useGetDoctorSchedulesQuery } from '@/redux/api/doctorApi';

import { toast } from 'sonner';


const DoctorSchedulesPage = () => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
const [deleteDoctorSchedule] =useDeleteDoctorScheduleMutation()
   const [allSchedule, setAllSchedule] = useState<any>([]);
   const { data, isLoading } = useGetDoctorSchedulesQuery({})
   console.log(data);

   const schedules = data?.schedules;
   const meta = data?.meta;

   console.log(schedules);

   useEffect(() => {
      const updateData = schedules?.map(
         (schedules: ISchedule, index: number) => {
            return {
               sl: index + 1,
               id: schedules?.scheduleId,
               startDate: dateFormatter(schedules?.schedule?.startDate),
               startTime: dayjs(schedules?.schedule?.startDate).format('hh:mm a'),
               endTime: dayjs(schedules?.schedule?.endDate).format('hh:mm a'),
            };
         }
      );
      setAllSchedule(updateData);
   }, [schedules]);


   const handleDelete = async(id :string)=>{
      try {
        const res =await deleteDoctorSchedule(id).unwrap();
        if (res?.id) {
          toast.success('Doctor deleted successfully')
        }
      
      } catch (error:any) {
        console.error(error.message)
      }
    }

   const columns: GridColDef[] = [
      { field: 'sl', headerName: 'SL' },
      { field: 'startDate', headerName: 'Date', flex: 1 },
      { field: 'startTime', headerName: 'Start Time', flex: 1 },
      { field: 'endTime', headerName: 'End Time', flex: 1 },
      {
         field: 'action',
         headerName: 'Action',
         flex: 1,
         headerAlign: 'center',
         align: 'center',
         renderCell: ({ row }) => {
            return (
               <IconButton aria-label='delete' onClick={()=>handleDelete(row.id)}>
                  <DeleteIcon sx={{ color: 'red' }} />
               </IconButton>
            );
         },
      },
   ];

   return (
      <Box>
         <Button onClick={() => setIsModalOpen(true)}>
            Create Doctor Schedule
         </Button>
         <DoctorsSchedules open={isModalOpen} setOpen={setIsModalOpen} />
         <Box sx={{ mb: 5 }}></Box>

         <Box>
            {!isLoading ? (
               <Box my={2}>
                  <DataGrid rows={allSchedule ?? []} columns={columns} getRowId={(row) => row.sl}/>
               </Box>
            ) : (
               <h1>Loading.....</h1>
            )}
         </Box>
      </Box>
   );
};

export default DoctorSchedulesPage;