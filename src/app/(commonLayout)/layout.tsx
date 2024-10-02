import React from 'react'
import Navber from '../components/shared/Navber/Navber'

const CommonLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <Navber/>
      {children}
    </div>
  )
}

export default CommonLayout
