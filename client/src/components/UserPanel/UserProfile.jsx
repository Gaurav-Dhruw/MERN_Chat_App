import React from 'react'
import {HiArrowNarrowLeft} from 'react-icons/hi';
import { useChat } from '../../context/ChatProvider';

const UserProfile = ({setIsOpen}) => {
    const {userInfo} = useChat();
  return (
    <div className=' '>
        <div className='flex justify-end  '>

            <span onClick={()=>setIsOpen(prevState=>!prevState)} className='text-3xl opacity-90 my-2 mx-5 cursor-pointer'>
                <HiArrowNarrowLeft/>
            </span>
        </div>
        <div className=' mb-14'>
            <div className='w-[10rem] h-[10rem] shadow-lg  overflow-hidden rounded-full m-auto cursor-pointer mb-8'>    
                <img src={userInfo.picture} alt=""  className='w-full h-full'/> 
            </div>
            <div className='flex justify-center items-center'>
                <label htmlFor='profile_pic'>
                    <span
                        className='transition shadow-md duration-200mx-2 text-sm  outline-none focus:outline-none border-0 hover:bg-gray-200 mx-3 p-2 px-3 rounded-lg cursor-pointer'>
                            Change
                    </span>
                </label>
                <span 
                    className='transition shadow-md duration-200mx-2 text-sm  outline-none focus:outline-none border-0 hover:bg-gray-200 mx-3 p-2 px-3 rounded-lg cursor-pointer text-red-600'>
                        Remove
                </span>

                <input type="file" name="profile_pic" id="profile_pic" className='hidden'/>
            </div>
        </div>
        
        <form onSubmit={()=>{}} className='flex justify-center'>
            
            <input required placeholder={userInfo.name} className='text-xl px-2 w-1/2  font-semibold outline-none border-b-2 border-white focus:border-blue-400 placeholder:text-gray-800'/>
                
            
            < button className=' transition shadow-md border-none outline-none focus:outline-none duration-200mx-2 text-sm hover:bg-gray-200 mx-5 p-2 px-3 rounded-lg cursor-pointer'>
                Update
            </button>
        </form>
        
    </div>
  )
}

export default UserProfile