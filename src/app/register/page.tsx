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
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/actions/auth.service";
import PHForm from "../components/Forms/PHForm";
import PHInputs from "../components/Forms/PHInputs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";





export const patientValidationSchema = z.object({
  email:z.string().email('Please provide valied email'),
  name: z.string().min(1,"Please Provide full name"),
  contactNumber: z.string().regex(/^\d{11}$/,'Give valied phone number'),
  address: z.string().min(1, "please enter your address"),
  
});
export const validationSchema = z.object({
  password:z.string().min(6,"Must be 6 char"),
  patient:patientValidationSchema
})

export const defaultValues ={
    password: " ",
    patient:{
      name: "",
      email: "",
      contactNumber: "",
      address: ""
    }
 
}
const RegisterPage = () => {
  const router = useRouter()


  const handleRegister = async (values: FieldValues) => {
    const data = modifyPayload(values);

    try {
      const res = await registerPatient(data)

      if (res?.data?.id) {
        toast.success(res?.message)
        const resust = await userLogin({ password: values?.password, email: values?.patient?.email })

        if (resust?.data?.accessToken) {

          storeUserInfo({ accessToken: res?.data?.accessToken })
          router.push('/dashboard')

        }
      }

    } catch (err: any) {
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

            <PHForm onSubmit={handleRegister}
            resolver={zodResolver(validationSchema)}
            defaultValues={defaultValues}
            >

              <Grid2 container spacing={2} my={1}>
                <Grid2 size={12}>

                
                    
                    <PHInputs
                      label="Name"

                      fullWidth={true}
                      name="patient.name"
                    />
                
                </Grid2>
                <Grid2 size={{ xs: 6, md: 6 }}>


                    <PHInputs
                      label="Email"
                      type="email"
                      fullWidth={true}
                      name="patient.email"
                    />
              
                </Grid2>
                <Grid2 size={{ xs: 6, md: 6 }}>
                
                  <PHInputs
                    label="Password"
                    type="password"
                    fullWidth={true}
                    name="password"
                  />
                    
                </Grid2>
                <Grid2 size={{ xs: 6, md: 6 }}>
                
                  <PHInputs
                    label="Contact Number"
                    type="tel"
                    fullWidth={true}
                    name="patient.contactNumber"
                  />
                 
                </Grid2>
                <Grid2 size={{ xs: 6, md: 6 }}>
              
                  <PHInputs
                    label="Address"
                    type="text"
                    fullWidth={true}
                    name="patient.address"
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
            </PHForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;