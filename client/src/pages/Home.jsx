import React , {useEffect} from 'react'
import {Chat,UserPanel,Loader} from '../components';
import { useChat } from '../context/ChatProvider';
import {useGetAllChats} from '../hooks';
import {useSetStatus, useSocketConnection} from '../hooks/useSocket';
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {userInfo, setUserInfo} = useChat();
  const navigate = useNavigate();

  useEffect( () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if(token){
      const user = jwt_decode(token);
      // console.log(user);
      delete user.iat;
      setUserInfo(user);
    }
    else{
      // navigate('/auth');
    }
  }, []);
  
  const {isLoading} = useGetAllChats();
  useSocketConnection();
  useSetStatus();

  
  return (
      <div className='h-screen p-5 '>
          <div className='h-full flex rounded-lg shadow-lg bg-slate-100 overflow-hidden'>
              {
                isLoading?
                  <Loader/>
                :
                  <>
                    <div className='w-1/3'>
                        <UserPanel/>
                    </div>
                    <div className='w-2/3'>
                        <Chat/>
                    </div>
                  </>
              }
          </div>

      </div>
  )
}

export default Home