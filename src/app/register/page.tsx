"use client";
import {
  Box,
  Button,
  Container,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface IPatientData {
  name: string;
  email: string;
  contactNumber: string;
  address: string;
}

interface IPatientRegisterFormData {
  password: string;
  patient: IPatientData;
}



const RegisterPage = () => {
  const router =useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IPatientRegisterFormData>()

  const onSubmit: SubmitHandler<IPatientRegisterFormData> =async (values) => {
  const data =  modifyPayload(values);

  try {
   const res = await registerPatient(data)
   console.log(res)
    if(res?.data?.id){
      toast.success(res?.message)
      router.push('/login')
    }
    
  } catch (err:any) {
    console.error(err.message)
  }

    // console.log(values)
  }
  

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Patient Register
              </Typography>
            </Box>
          </Stack>

          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid2 container spacing={2} my={1}>
                <Grid2 size={{ xs: 6, md: 12 }}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("patient.name")}
                  />
                </Grid2>
                <Grid2 size={{ xs: 6, md: 6 }}>
                  <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("patient.email")}
                  />
                </Grid2>
                <Grid2 size={{ xs: 6, md: 6 }}>
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("password")}
                  />
                </Grid2>
                <Grid2 size={{ xs: 6, md: 6 }}>
                  <TextField
                    label="Contact Number"
                    type="tel"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("patient.contactNumber")}
                  />
                </Grid2>
                <Grid2 size={{ xs: 6, md: 6 }}>
                  <TextField
                    label="Address"
                    type="text"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("patient.address")}
                  />
                </Grid2>
              </Grid2>
              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account? {' '}
                <Link href="/login">
                  <Typography component='span'
                    sx={{ color: 'primary.main' }}
                  >
                    Login
                  </Typography></Link>
              </Typography>
            </form>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;