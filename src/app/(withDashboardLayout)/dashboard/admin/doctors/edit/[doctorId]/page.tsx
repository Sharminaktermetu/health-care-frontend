"use client";


import PHForm from "@/app/components/Forms/PHForm";
import PHInputs from "@/app/components/Forms/PHInputs";
import PHSelectField from "@/app/components/Forms/PHSelectField";
import {
  useGetDoctorQuery,
  useSingleDoctorQuery,
  useUpdateSingleDoctorMutation,

} from "@/redux/api/doctorApi";
import { Gender } from "@/types";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
  params: {
    doctorId: string;
  };
};

const DoctorUpdatePage = ({ params }: TParams) => {
  //   console.log(params?.doctorId);
  const router = useRouter();

  const id = params?.doctorId;

  const { data, isLoading } = useSingleDoctorQuery(id);
  const [updateSingleDoctor] = useUpdateSingleDoctorMutation();
  //   console.log(data);

  const handleFormSubmit = async (values: FieldValues) => {
    values.experience = Number(values.experience);
    values.apointmentFee = Number(values.apointmentFee);
    values.id = id;
    console.log({ id: values.id, body: values });

    try {
      const res = await updateSingleDoctor({ id: values.id, body: values }).unwrap();
      if (res?.id) {
        toast.success("Doctor Updated Successfully!!!");
        router.push("/dashboard/admin/doctors");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    email: data?.email || "",
    name: data?.name || "",
    contactNumber: data?.contactNumber || "",
    address: data?.address || "",
    registrationNumber: data?.registrationNumber || "",
    gender: data?.gender || "",
    experience: data?.experience || 0,
    apointmentFee: data?.apointmentFee || 0,
    qualification: data?.qualification || "",
    currentWorkingPlace: data?.currentWorkingPlace || "",
    designation: data?.designation || "",
  };
  return (
    <Box>
      <Typography component="h5" variant="h5">
        Update Doctor Info
      </Typography>
      {isLoading ? (
        "Loading..."
      ) : (
        <PHForm
          onSubmit={handleFormSubmit}
          defaultValues={data && defaultValues}
        >
          <Grid2 container spacing={2} sx={{ my: 5 }}>
            <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInputs
                name="name"
                label="Name"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInputs
                name="email"
                type="email"
                label="Email"
                fullWidth={true}
                disabled={true}
                sx={{
                  mb: 2, 
                }}

              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInputs
                name="contactNumber"
                label="Contract Number"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInputs
                name="address"
                label="Address"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInputs
                name="registrationNumber"
                label="Registration Number"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInputs
                name="experience"
                type="number"
                label="Experience"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
              <PHSelectField
                items={Gender}
                name="gender"
                label="Gender"
                sx={{ mb: 2 }}
                fullWidth={true}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInputs
                name="apointmentFee"
                type="number"
                label="ApointmentFee"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInputs
                name="qualification"
                label="Qualification"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInputs
                name="currentWorkingPlace"
                label="Current Working Place"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInputs
                name="designation"
                label="Designation"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid2>
          </Grid2>

          <Button type="submit">Update</Button>
        </PHForm>
      )}
    </Box>
  );
};

export default DoctorUpdatePage;