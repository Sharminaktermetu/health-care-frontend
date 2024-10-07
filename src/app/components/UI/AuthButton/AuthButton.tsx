import { getUserInfo, removeUser } from '@/services/actions/auth.service'
import { Button } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const AuthButton = () => {
  const router =useRouter()
  const userInfo = getUserInfo()
const handelLogout =()=>{
  removeUser()
  router.refresh()
}
  return (
    <>
       {userInfo?.userId ? (
                  <Button
                     color='error'
                     onClick={handelLogout}
                     sx={{ boxShadow: 0 }}
                  >
                     Logout
                  </Button>
               ) : (
                  <Button component={Link} href='/login'>
                     Login
                  </Button>
               )}
    </>
  )
}

export default AuthButton
