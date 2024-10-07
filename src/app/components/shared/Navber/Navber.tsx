"use client"


import { getUserInfo, isLoggedin, removeUser } from '@/services/actions/auth.service'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

import dynamic from 'next/dynamic'

const Navber = () => {
  const AuthButton = dynamic(() => import('../../UI/AuthButton/AuthButton'), { ssr: false })
  return (
    <Container>
      <Stack py={2} direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h4' component={Link} href='/' fontWeight={600}>
          P
          <Box component='span' color="primary.main">
            H
          </Box>{" "}
          Health Care
        </Typography>

        <Stack direction='row' gap={4}>
          <Typography component={Link} href='/consaltation'>Consaltation</Typography>
          <Typography component={Link} href='/health-plans'>Health Plans</Typography>
          <Typography component={Link} href='/medicine'>Medicine</Typography>
          <Typography component={Link} href='/diagnostics'>Diagnostics</Typography>
          <Typography component={Link} href='/ngos'>NGOs</Typography>
        </Stack>
        <AuthButton/>
      </Stack>
    </Container>
  )
}

export default Navber
