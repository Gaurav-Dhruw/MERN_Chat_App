import { useMutation, useQuery } from 'react-query';
import { useChat } from '../context/ChatProvider';
import axiosInstance from '../lib/axios.config';
import { formatSearchList } from '../util';



export const useSearchUser =()=>{
    const {setSearchList} = useChat();

    return useMutation(
      (keyword) => axiosInstance.get( `/api/user/search/${keyword}`),
      {
        onSuccess:(result)=>{
          // console.log(result.data)
          result.data = formatSearchList({chats:result.data});
          setSearchList(result.data);
        },
        onError: error=>console.log(error),
      }
    );
}

 
