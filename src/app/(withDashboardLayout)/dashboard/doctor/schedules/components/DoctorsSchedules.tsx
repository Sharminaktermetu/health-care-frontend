import PHDatePicker from '@/app/components/Forms/PHDatePicker'
import PHForm from '@/app/components/Forms/PHForm'
import PHTimePicker from '@/app/components/Forms/PHTimePicker'
import PHModal from '@/app/components/shared/PHModal/PHModal'
import { Button, Grid2 } from '@mui/material'
import React, { useState } from 'react'
import { TProps } from '../../../admin/specialties/components/SpecialistModal'
import { FieldValues } from 'react-hook-form'
import dayjs from 'dayjs'
import {  useGetSchedulesQuery } from '@/redux/api/schedules'
import MultipleSelectField from './MultipleSelectField'
import LoadingButton from '@mui/lab/LoadingButton';
import { useCreateDoctorSchedulesMutation } from '@/redux/api/doctorApi'
import { toast } from 'sonner'

const DoctorsSchedules = ({open, setOpen}:TProps) => {
    const [selectedDate, setSelectedDate] = useState('');
   
    
    const [selectedScheduleIds, setSelectedScheduleIds] = useState<string[]>([]);
    console.log(selectedScheduleIds)
    const query :Record<string ,any> ={}

if (!!selectedDate) {
    query['startDate'] =dayjs(selectedDate).hour(0).minute(0).millisecond(0).toISOString()
    query['endDate'] =dayjs(selectedDate).hour(23).minute(59).millisecond(999).toISOString()
}

const {data} =useGetSchedulesQuery(query)

const schedules =data?.schedules;

const [createDoctorSchedules,{isLoading}] =useCreateDoctorSchedulesMutation()

    const handleFormSubmit = async (values: FieldValues) => {
   
      try {
        const res = await createDoctorSchedules
        ({
           scheduleIds: selectedScheduleIds,
        });
        if (res?.data?.count===1) {
          toast.success("Sehedule selected successfully")
          setSelectedScheduleIds([]);
          setSelectedDate('')
        }
        setOpen(false);

     } catch (error) {
        console.log(error);
     }
       };


  return (
    <PHModal open={open} setOpen={setOpen} title="Create Schedules">
    <PHForm onSubmit={handleFormSubmit}>
      <Grid2 container gap={2}>
        <Grid2 size={{md:12}}>
         <PHDatePicker 
         name="date"
          label="Date"
           fullWidth  
          value={dayjs(selectedDate) || ''}
        onChange={(date:any) => setSelectedDate(dayjs(date).toISOString())}
        />
        </Grid2>
       <Grid2 size={{md:12}}>
       <MultipleSelectField 
       schedules={schedules}
       selectedScheduleIds={selectedScheduleIds}
       setSelectedScheduleIds={setSelectedScheduleIds}
       />
       </Grid2>
     
        
      </Grid2>
      <LoadingButton
          size="small"
          onClick={handleFormSubmit}
          loading={isLoading}
          loadingIndicator="Loading…"
          variant='contained'
          
        >
          Create
        </LoadingButton>
    </PHForm>
  </PHModal>
  )
}

export default DoctorsSchedules
