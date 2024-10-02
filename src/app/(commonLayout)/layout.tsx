import React from 'react'
import Navber from '../components/shared/Navber/Navber'
import Footer from '../components/shared/Footer/Footer'

const CommonLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <Navber/>
      <div className='min-h-screen'>
      {children}
      </div>
      <Footer/>
    </div>
  )
}

export default CommonLayout
