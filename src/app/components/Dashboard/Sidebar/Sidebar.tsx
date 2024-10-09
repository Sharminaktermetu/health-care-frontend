import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import PhIcon from "@/assets/svgs/logo.svg";
import { drawerItems } from '@/utils/drawerItems';
import { UserRole } from '@/types';
import SidebarItem from './SidebarItem';
import { getUserInfo } from '@/services/actions/auth.service';
const Sidebar = () => {
    const [userRole , setUserRole] =useState('')
   
   useEffect(()=>{
    const {role} = getUserInfo()
    setUserRole(role)
   },[])
  return (
    <Box>
        <Stack
        sx={{
          py: 1,
          mt: 1,
        }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
        component={Link}
        href="/"
      >
        <Image src={PhIcon} width={40} height={40} alt="logo" />
        <Typography
          variant="h6"
          component="h1"
          sx={{
            cursor: "pointer",
          }}
        >
          PH Health Care
        </Typography>
      </Stack>
      <List>
            {drawerItems(userRole as UserRole).map((item, index) => (
              <SidebarItem key={index} item={item} index={index}/>
            ))}
          </List>
    </Box>
  )
}

export default Sidebar
