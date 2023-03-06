import React from 'react'
import { CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-full w-full'>
      <CircularProgress/>
    </div>
  )
}

export default Loader