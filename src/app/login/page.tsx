"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form";


import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { toast } from "sonner";
import { storeUserInfo } from "@/services/actions/auth.service";
import PHForm from "../components/Forms/PHForm";
import PHInputs from "../components/Forms/PHInputs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const validationSchema = z.object({
  email:z.string().email('Please provide valied email'),
  password:z.string().min(6,"Must be 6 char")
});



const LoginPage = () => {
  const [error,setError] =useState('')
  const router = useRouter();


  const handleLogin = async (values:FieldValues) => {
    // console.log(values);
    try {
      const res = await userLogin(values)

      if (res?.data?.accessToken) {
        toast.success(res?.message)
        storeUserInfo({ accessToken: res?.data?.accessToken })
        router.push('/')

      }
      else{
        setError(res.message)
      }
    } catch (error) {

    }
  };

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
                Login PH HealthCare
              </Typography>
            </Box>
          {
            error&&  <Box>
            <Typography fontSize={18} color="white" fontWeight={500} sx={{bgcolor:'red',padding:'0 10px',borderRadius:'5px'}}>
              {error}!!
            </Typography>
          </Box>
          }
          </Stack>
          <Box>
            <PHForm onSubmit={handleLogin} 
            resolver={zodResolver(validationSchema)}
            defaultValues={{
              email:" ",
              password: " "
            }}
            >
              <Grid2 container spacing={2} my={2}>
                <Grid2 size={{ xs: 6, md: 6 }}>
               
                  <PHInputs
                  name="email"
                    label="Email"
                    type="email"
                  
                    fullWidth={true}
                   
                  />
              
                </Grid2>
                <Grid2 size={{ xs: 6, md: 6 }}>
               
                  <PHInputs
                  name="password"
                    label="Password"
                    type="password"
                    
                    fullWidth={true}
                  
                  />
                 
                </Grid2>
              </Grid2>

              <Typography mb={1} textAlign="end" component="p" fontWeight={300}>
                Forgot Password?
              </Typography>

              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Login
              </Button>
              <Typography component="p" fontWeight={300}>
                Don&apos;t have an account?{" "}
                <Link href="/register">
                  <Typography component='span'
                    sx={{ color: 'primary.main' }}
                  >
                    Create an account
                  </Typography>
                </Link>
              </Typography>
            </PHForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;