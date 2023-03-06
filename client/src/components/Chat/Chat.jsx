import React, {useState, useEffect,useRef} from 'react'
import ChatHeader from './ChatHeader'
import ChatBubble from './ChatBubble'
import ChatInput from './ChatInput';
import {Loader} from '../../components';
import { useChat } from '../../context/ChatProvider'
import { useGetMessages} from '../../hooks';
import { useScroll } from '../../hooks/useScroll';




const Chat = () => {
  const {userInfo, activeChat, messages} = useChat();
  const {mutate,isLoading} = useGetMessages();
  const ref  = useScroll({activeChat,messages});
  
  useEffect(() => {
      if(activeChat)
          mutate(activeChat._id);
      
  }, [activeChat]); 

  
  return (
        <>
        <div className='h-full bg-slate-100'>
          {activeChat? 
          <div className='flex flex-col h-full'>
            <ChatHeader/>

            <div ref={ref} className='h-full bg-slate-50 p-5 overflow-auto scroll-style'>
              {
                isLoading ? 
                  <Loader/> 
                  :
                  messages.map(message=>
                    <ChatBubble key={message._id} message={message} sender={userInfo._id===message.sender._id}/>
                  )
              }
            </div>
            
            <ChatInput/>
          </div>
          :
          <div></div>
          }
        </div>
        </>
        

  )
}

export default Chat