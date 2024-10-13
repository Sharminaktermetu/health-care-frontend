"use client"
import { Box, Button, Stack, TextField,IconButton, Paper, } from '@mui/material'
import React, { useState } from 'react'
import DoctorsModal from './components/DoctorsModal'
import EditIcon from '@mui/icons-material/Edit';



import { DataGrid, GridColDef, GridDeleteIcon } from '@mui/x-data-grid';

import { toast } from 'sonner'
import { useDeleteDoctorMutation, useGetDoctorQuery } from '@/redux/api/doctorApi';
import { useDebounced } from '@/redux/store';
import Link from 'next/link';

const doctorsPage = () => {
  const [isModalOpen, setIsModalOpen] =useState<boolean>(false)
  const [searchTerm,setSearchTerm] =useState<string>("")
const query: Record<string,any> ={};

const debouncedItem = useDebounced({
  searchQuery: searchTerm,
  delay:600,
})
if (!!debouncedItem) {
  query["searchTerm"]= searchTerm

}


  const {data,isLoading} =useGetDoctorQuery({...query})
  const doctors = data?.doctors;
  console.log(doctors)
  const meta = data?.meta;

  const [deleteDoctor] =useDeleteDoctorMutation()

  const handleDelete = async(id :string)=>{
    try {
      const res =await deleteDoctor(id).unwrap();
      if (res?.id) {
        toast.success('Doctor deleted successfully')
      }
    
    } catch (error:any) {
      console.error(error.message)
    }
  }






  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex:1 },
    { field: 'email', headerName: 'Email', flex:1 },
    { field: 'contactNumber', headerName: 'Phone', flex:1 },
   
    { 
      field: 'action',
       headerName: 'Action',
       width: 450, 
       flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell:({row})=>{
      return (
        <IconButton  aria-label="edit" onClick={()=>handleDelete(row.id)}>
        <GridDeleteIcon />
        </IconButton>
         
       
      )
    }
  },
    { 
      field: 'edit',
       headerName: 'Edit',
       width: 450, 
       flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell:({row})=>{
      return (
  
         
   <Link href={`/dashboard/admin/doctors/edit/${row.id}`}>
   <IconButton  aria-label="delete">
   <EditIcon /> 
</IconButton>
   
   </Link>
       
      )
    }
  },
  ];
  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Button onClick={()=>setIsModalOpen(true)}>Create Doctor</Button>
   <DoctorsModal open={isModalOpen} setOpen={setIsModalOpen}></DoctorsModal>
        <TextField  onChange={(e)=>setSearchTerm(e.target.value)} placeholder='Search Doctors' size='small'/>
      </Stack>
      {
        !isLoading ?
       <Box> 
       <DataGrid
       rows={doctors}
       columns={columns}
      
       sx={{ border: 0 }} 
       
     />
      </Box>

      : <Box>Loading.......</Box>
      }
    </Box>
  )
}

export default doctorsPage
