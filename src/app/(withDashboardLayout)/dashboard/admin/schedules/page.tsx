"use client"

import { Box, Button, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import SchedulesModal from './components/SchedulesModal'

const SchedulesPage = () => {
    const [isModalOpen, setIsModalOpen] =useState<boolean>(false)
  return (
    <Box>
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
      <Button onClick={()=>setIsModalOpen(true)}>Create Schedules</Button>
 <SchedulesModal open={isModalOpen} setOpen={setIsModalOpen}/>
      
    </Stack>
   
  </Box>
  )
}

export default SchedulesPage
