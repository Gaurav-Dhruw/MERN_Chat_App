import React , {useState,useEffect} from 'react';

import {Route, Routes, useNavigate} from 'react-router-dom';
import {SignUp,Login, Modal} from './components';
import {Home, Auth} from './pages'
import { useChat } from './context/ChatProvider';

function App() {


    
    return (

          <Routes>
        
            <Route path='/auth' element={<Auth/>}>
              <Route index element={<Login/>}/>
              <Route path='login' element={<Login/>}/>
              <Route path='signup' element={<SignUp/>}/>
            </Route>
            {/* <Route path='/modal' element={<Modal/>}/> */}
            <Route path='/' element={<Home/>}/>

          </Routes>
      
    )
}
export default App;