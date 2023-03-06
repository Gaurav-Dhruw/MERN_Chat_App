import React, {useState} from 'react'
import { useSendMessage } from '../../hooks';
import { useChat } from '../../context/ChatProvider';
import SendIcon from '@mui/icons-material/Send';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const {mutate} = useSendMessage();
  const {activeChat} = useChat(); 
  
  
  function handleSend(){
    if(message.trim().length === 0 ) return ;
    // update mutation data;
    mutate({
      chat_id: activeChat._id,
      content: message,
    });
  }
  return (
    <div className=' '>
        <div className='flex bg-white  px-4  rounded-xl my-3 mx-14'>
            <input 
                  onChange={e=>setMessage(e.target.value)}
                  className='w-full  outline-none' placeholder="Type a message..." type="text"/>
            <button className='bg-inherit hover:bg-inherit'
              onClick={handleSend}>
              <SendIcon className='opacity-60'/>
              </button>
        </div>
    </div>  
  )
}

export default ChatInput