 "use client"

import { Box, Button, IconButton, Paper, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import SpecialistModal from './components/SpecialistModal'
import { useDeleteSpecialtyMutation, useGetSpecialtyQuery } from '@/redux/api/speacialityApi'



import { DataGrid, GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import Image from 'next/image'
import { toast } from 'sonner'









const SpecialtiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);




  const {data,isLoading} =useGetSpecialtyQuery({})
  const [deleteSpecialty]=useDeleteSpecialtyMutation()


  const handleDelete = async(id :string)=>{
    try {
      const res =await deleteSpecialty(id).unwrap();
      if (res?.id) {
        toast.success('Speciality deleted successfully')
      }
    
    } catch (error:any) {
      console.error(error.message)
    }
  }
  
  
  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', width: 300 },
    { 
      field: 'icon',
 
       headerName: 'Icon', 
       width: 300,
      headerAlign:'center',
        renderCell:({row})=>{
      return (
      
         <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', py:1}}>
           <Image src={row?.icon} alt='icon' width={30} height={30}/>
         </Box>
        
      )
    }
  },
    { 
      field: 'action',
       headerName: 'Action',
       width: 450, 
       flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell:({row})=>{
      return (
  
          <IconButton  aria-label="delete" onClick={()=>handleDelete(row.id)}>
    <GridDeleteIcon />
  </IconButton>
       
      )
    }
  },
  ];
  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Button onClick={()=>setIsModalOpen(true)}>Create Speaciality</Button>
        <SpecialistModal open={isModalOpen} setOpen={setIsModalOpen}/>
        <TextField placeholder='Search specialist' size='small'/>
      </Stack>

      <Paper sx={{ height: 400, width: '100%',my:3 }}>
      {
        !isLoading ?
         <DataGrid
        rows={data}
        columns={columns}
       
        sx={{ border: 0 }} 
        hideFooter={true}
      />
      : <Box>Loading.......</Box>
      }
    </Paper>
    </Box>
  )
}

export default SpecialtiesPage
