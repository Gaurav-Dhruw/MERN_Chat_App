import {socket} from '../lib/socket.config';
import { useEffect } from 'react';
import { useChat } from '../context/ChatProvider';
import { formatChat } from "../util";


export const useSocketConnection = () => {
  const {dispatchOnlineUsers,dispatchChatList, userInfo, activeChat, dispatchMessages} = useChat();
 

  return useEffect(() => {
    
    socket.on('connect',()=>{
        console.log('connected')
       
    })

    socket.on('disconnect',()=>{
        console.log("disconnected");
    })

    socket.on('online-users',(chat)=>{
      dispatchOnlineUsers({type:'UPDATE',payload:chat});
    })

    socket.on('message-received',(message)=>{
      message.chat = formatChat({userInfo, chat:message.chat});
      console.log('message-received',message);

      if(activeChat && activeChat._id === message.chat._id) {
        dispatchMessages({type:'ADD_MESSAGE', payload:message});
        dispatchChatList({type:'UPDATE_CHATLIST',payload:message});
      }
      else{
        dispatchChatList({type:"SET_NOTIFICATION", payload: message});
      }
    });
    
  
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('online-users');
      socket.off('message-received');
    }
  },[activeChat,userInfo]);

}

export const useSetStatus = () =>{
    const {userInfo} = useChat();

    const handleFocus=()=>{
      socket.emit('online',userInfo)
    }
    
    const handleBlur = () =>{
      console.log('blured');
      socket.emit('offline',userInfo);
    }

    useEffect(() => {
      if(userInfo) socket.emit('online',userInfo);
      // window.addEventListener('focus', handleFocus);
      // window.addEventListener('blur', handleBlur);
    
      return () => {
        // window.removeEventListener('focus',handleFocus);
        // window.removeEventListener('blur',handleBlur);
      }
    }, [userInfo]);

 
}


