import React, {useState,useEffect} from 'react'
import {UserPanelHeader, ChatTab, UserProfile} from './index';
import {Modal} from '../index'
import {easeIn, easeOut, motion} from 'framer-motion';
import { useChat} from '../../context/ChatProvider';
import {useGetChat} from '../../hooks';


const variants = {
  open: {opacity:1, x:0},
  closed:{opacity:0, x:'-100%'}
}

const UserPanel = () => {

  const {mutate} = useGetChat();
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newChat, setNewChat] = useState();
  const {activeChat,setActiveChat, chatList, searchList, dispatchChatList} = useChat();
  // const [chats, setChats] = useState([]);
  
  const handleTransformation=()=>{
    
    const transformedChatList = [];
    for(const [chat_id,chat] of chatList){
      transformedChatList.push(chat);
    }
    console.log(transformedChatList);

    setChats(transformedChatList);
  }
  
  // useEffect(()=>{
  //   handleTransformation();
  // },[chatList])

  return (
    <>
    <div className='relative h-full flex flex-col bg-white'>
      
      {/* Default User Panel */}
      <div className='absolute w-full h-full p-3'>

        <UserPanelHeader setIsOpen={setIsOpen}/>

        <div className='h-full overflow-y-auto scroll-style'>
          { searchList.length !==0 ? searchList.map(user=>(
            <div key={user._id} onClick={()=>{
              setNewChat(user);
              setModalOpen(true);   
              }} >
              <ChatTab chat={user}/>
            </div>
            ))
            : 
            chatList.length!==0 && chatList.map(chat =>(
              <div key={chat._id} onClick={()=>{
                setActiveChat(chat)
                dispatchChatList({type:"UNSET_NOTIFICATION", payload:chat});
                }} >
                <ChatTab chat={chat} active={activeChat && activeChat._id==chat._id}/>
              </div>
            ))
          }
        </div>
      </div>

      {/* User Profile */}
      <motion.div 
        className='absoulte w-full h-full p-3 z-10 bg-white'
        initial="closed"
        animate={isOpen?"open":"closed"}
        variants={variants}
        transition={{ type: "tween", ease:"easeInOut"}}
        >
          <UserProfile setIsOpen={setIsOpen}/>
      </motion.div>
    </div>
    <Modal isOpen={modalOpen} setIsOpen={setModalOpen} chat={newChat} mutate={mutate}/>
    </>
    
  )
}

export default UserPanel