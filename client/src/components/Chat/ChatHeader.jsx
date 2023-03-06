import React,{useState,useEffect} from 'react'
import { useChat } from '../../context/ChatProvider'
// import {socket} from '../../lib/socket.config'

const ChatHeader = () => {
  const {onlineUsers, activeChat} = useChat();
  const [isOnline,setIsOnline] = useState(false);

  
  useEffect(() => {
    if(!activeChat) return;
    // console.log(onlineUsers);
    // console.log(typeof(activeChat._id), onlineUsers.has('64035abf4a0a36c13423eb74'));
    if(onlineUsers.get(activeChat._id).indexOf(activeChat.users[0]._id)>=0)
      setIsOnline(true);
    else
      setIsOnline(false);

  }, [onlineUsers,activeChat]);

  return (
    <div className='flex items-center justify-between px-5 py-3 border-b-2 '>
        <div className='flex '> 
          <div className='w-12 h-12 rounded-full overflow-hidden cursor-pointer '>
            <img src='src/assets/profile_pic_default.jpg' />
          </div>
          <div className='mx-4 '>
            <h3 className=' my-1'>
              {activeChat.chatName}
            </h3>
            {
              isOnline ?
           
                <span className="block text-xs before:content-[''] before:inline-block before:relative before:-top-1 before:rounded-full before:w-1 before:h-1 before:bg-green-500 before:mr-1">
                  Online
                </span> 
             :<></>
            }
            
              
           
          </div>
          
        </div>
        
        {/* <div className='mx-5 text-sm'>
          <input type='search' placeholder='Search Message' className='outline-none p-2 px-3 rounded-xl'/>
        </div> */}

    </div>
  )
}

export default ChatHeader