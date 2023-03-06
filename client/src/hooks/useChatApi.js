import axiosInstance from '../lib/axios.config'
import { formatChat, formatChatList } from '../util';
import { useMutation, useQuery} from 'react-query'
import {useChat} from '../context/ChatProvider';

export const useGetChat = ()=>{
    const {activeChat,setActiveChat,userInfo,searchList,setSearchList}  = useChat();

    return useMutation(
        (data) => axiosInstance.post('/api/chat',data),
        {
            onSuccess:(result)=>{
                // console.log(result.data);
                result.data = formatChat({userInfo,chat:result.data})
                if(!activeChat || activeChat._id!==result.data._id) setActiveChat(result.data);
                if(searchList.length!==0) setSearchList([]);
            },
            onError:()=>{
    
            }
        }
    );
      
}



export const useGetAllChats = () =>{

    const {userInfo,dispatchChatList} = useChat();
      
    return useQuery('chat-list',
        () => axiosInstance.get('/api/chat'),
        {  
            cacheTime:10*60*1000,
            staleTime:10*60*1000,
            select: result => formatChatList({userInfo,chats:result.data}),
            onSuccess:(data)=>{
                // console.log(data);
                dispatchChatList({type:"SET_CHATLIST", payload:data});
            },
            onError: error=>console.log(error.message)
        }
    );
      
}