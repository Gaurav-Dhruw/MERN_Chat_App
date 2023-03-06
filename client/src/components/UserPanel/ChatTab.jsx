import React from 'react';
import moment from 'moment';
import { useChat } from '../../context/ChatProvider';

const ChatTab = ({chat,active}) => {
    const {userInfo} = useChat();
    return (
        <div className={`transistion duration-200 px-4 p-3 border-b-2 border-gray-200 flex ${active?'bg-gray-200':'bg-gray-100'}`}>
            <div className='w-12 h-12 min-w-[3rem]  min-h-[3rem] rounded-full overflow-hidden'>
                <img src="src/assets/profile_pic_default.jpg" alt='Pic'/>
            </div>
            <div className='w-5/6 ml-4'>
                <div className='flex justify-between'>
                    <h2>
                        {chat.chatName}
                    </h2>
                    {
                        chat.notification && <span className='text-xs text-white text-center rounded-full bg-pink-500 w-4 h-4'>
                            {chat.notification}
                        </span>
                    }
                </div>
                {chat.latestMessage && 
                <div className='flex justify-between items-center mt-1'>
                    <div className='truncate text-sm'>
                        {
                        userInfo._id===chat.latestMessage.sender._id ? 'you: ':''  
                        }
                        {chat.latestMessage.content}
                    </div>
                    <div className='text-gray-500  text-xs'>
                        {moment(chat.latestMessage.createdAt).format('LT')}
                    </div>
                    
                </div>
                }
            </div>

        </div>
    )
}

export default ChatTab;
