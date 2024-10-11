import React from 'react'
import Navber from '../components/shared/Navber/Navber'
import Footer from '../components/shared/Footer/Footer'
import { Box } from '@mui/material'

const CommonLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
        <Navber />
      <Box className="min-h-screen">{children}</Box>
      <Footer />
    </>
  )
}

export default CommonLayout
