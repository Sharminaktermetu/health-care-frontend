import PHFileUploader from "@/app/components/Forms/PHFileUploader"
import PHForm from "@/app/components/Forms/PHForm"
import PHInputs from "@/app/components/Forms/PHInputs"
import PHModal from "@/app/components/shared/PHModal/PHModal"
import { Button, Grid2 } from "@mui/material"
import { FieldValues } from "react-hook-form"
import { TProps } from "../../specialties/components/SpecialistModal"
import PHDatePicker from "@/app/components/Forms/PHDatePicker"
import PHTimePicker from "@/app/components/Forms/PHTimePicker"
import { dateFormatter } from "@/utils/dateFormatter"
import { timeFormatter } from "@/utils/timeFormatter"
import { useCreateSchedulesMutation } from "@/redux/api/schedules"
import { toast } from "sonner"


const SchedulesModal = ({open, setOpen}:TProps) => {
  const [createSchedules]=useCreateSchedulesMutation()


    const handleFormSubmit = async (values: FieldValues) => {
       values.startDate =dateFormatter(values.startDate)
       values.endDate =dateFormatter(values.endDate)
       values.startTime=timeFormatter(values.startTime)
       values.endTime =timeFormatter(values.endTime)
   
        try {
          const res = await createSchedules(values);
         if (res?.data?.length) {
          toast.success('Schedule created successfully')
          setOpen(false)
         }
          
        } catch (err: any) {
          console.error(err.message);
        }
      };
  return (
    <PHModal open={open} setOpen={setOpen} title="Create Schedules">
      <PHForm onSubmit={handleFormSubmit}>
        <Grid2 container spacing={2}>
          <Grid2 size={{md:12}} sx={{width:'300px'}}>
           <PHDatePicker name="startDate" label="Start Date" fullWidth/>
          </Grid2>
          
          <Grid2 size={{md:12}}>
           <PHDatePicker name="endDate" label="End Date" fullWidth/>
          </Grid2>
          <Grid2 size={{md:6}}>
           <PHTimePicker name="startTime" label="Start Time" fullWidth/>
          </Grid2>
          
          <Grid2 size={{md:6}}>
           <PHTimePicker name="endTime" label="End Time" fullWidth/>
          </Grid2>
          
        </Grid2>
        <Button sx={{ mt: 1 }} type="submit">
          Create
        </Button>
      </PHForm>
    </PHModal>
  )
}

export default SchedulesModal
