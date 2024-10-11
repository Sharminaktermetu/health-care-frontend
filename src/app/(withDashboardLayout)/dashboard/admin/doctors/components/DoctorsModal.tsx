import PHFullScreenModal from "@/app/components/shared/PHModal/PHFullScreenModal"
import { TProps } from "../../specialties/components/SpecialistModal"
import PHForm from "@/app/components/Forms/PHForm"
import { FieldValues } from "react-hook-form";
import { Button, Grid2 } from "@mui/material";
import PHInputs from "@/app/components/Forms/PHInputs";
import { Gender } from "@/types";
import PHSelectField from "@/app/components/Forms/PHSelectField";
import { modifyPayload } from "@/utils/modifyPayload";
import { useCreateDoctorMutation } from "@/redux/api/doctorApi";
import { toast } from "sonner";



const DoctorsModal = ({open, setOpen}:TProps) => {
    
const [createDoctor] =useCreateDoctorMutation()
    const handleFormSubmit = async (values: FieldValues) => {


       values.doctor.experience = Number(values.doctor.experience)
       values.doctor.apointmentFee = Number(values.doctor.apointmentFee)
        const data = modifyPayload(values);
        
        try {
          const res = await createDoctor(data).unwrap();
          console.log(res);
          if (res?.id) {
            toast.success("Doctor created successfully!!");
            setOpen(false);
          }
        } catch (err: any) {
          console.error(err.message);
        }
      };
      const defaultValues = {
        doctor: {
          email: "",
          name: "",
          contactNumber: "",
          address: "",
          registrationNumber: "",
          gender: "",
          experience: 0,
          apointmentFee: 0,
          qualification: "",
          currentWorkingPlace: "",
          designation: "",
          profilePhoto: "",
        },
        password: "",
      };
  return (
    <PHFullScreenModal open={open} setOpen={setOpen} title="Create new Doctor">
        <PHForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid2 container spacing={2} sx={{ my: 5 }}>
          <Grid2  size={{xs:12, sm:12 ,md:4}}>
            <PHInputs
              name="doctor.name"
              label="Name"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid2>
          <Grid2 size={{xs:12, sm:12 ,md:4}}>
            <PHInputs
              name="doctor.email"
              type="email"
              label="Email"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid2>

          <Grid2 size={{xs:12, sm:12 ,md:4}}>
            <PHInputs
              name="password"
              type="password"
              label="Password"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid2>

          <Grid2 size={{xs:12, sm:12 ,md:4}}>
            <PHInputs
              name="doctor.contactNumber"
              label="Contract Number"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid2>
          <Grid2 size={{xs:12, sm:12 ,md:4}}>
            <PHInputs
              name="doctor.address"
              label="Address"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid2>
          <Grid2 size={{xs:12, sm:12 ,md:4}}>
            <PHInputs
              name="doctor.registrationNumber"
              label="Registration Number"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid2>
          <Grid2 size={{xs:12, sm:12 ,md:4}}>
            <PHInputs
              name="doctor.experience"
              type="number"
              label="Experience"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid2>
          <Grid2 size={{xs:12, sm:12 ,md:4}}>
            <PHSelectField
              items={Gender}
              name="doctor.gender"
              label="Gender"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid2>
          <Grid2 size={{xs:12, sm:12 ,md:4}}>
            <PHInputs
              name="doctor.apointmentFee"
              type="number"
              label="ApointmentFee"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid2>
          <Grid2 size={{xs:12, sm:12 ,md:4}}>
            <PHInputs
              name="doctor.qualification"
              label="Qualification"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid2>

          <Grid2 size={{xs:12, sm:12 ,md:4}}>
            <PHInputs
              name="doctor.currentWorkingPlace"
              label="Current Working Place"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid2>
          <Grid2 size={{xs:12, sm:12 ,md:4}}>
            <PHInputs
              name="doctor.designation"
              label="Designation"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid2>
        </Grid2>

        <Button type="submit">Create</Button>
      </PHForm>
    </PHFullScreenModal>
  )
}

export default DoctorsModal
