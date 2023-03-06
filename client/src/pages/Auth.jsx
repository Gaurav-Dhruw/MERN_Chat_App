
import React from 'react';
import {Outlet} from 'react-router-dom';


const Auth = () => {
    

  return (
    <>
        <div className='h-[100vh] pt-10 md:p-10 '>
          <Outlet/>  
        </div>
    </>
  )
}


export default Auth;