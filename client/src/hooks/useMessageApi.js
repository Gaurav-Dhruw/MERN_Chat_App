import axiosInstance from "../lib/axios.config";
import {useState, useReducer, useEffect} from 'react';
import {useMutation,useQuery} from 'react-query';
import { socket } from "../lib/socket.config";
import { useChat } from "../context/ChatProvider";


export const useSendMessage = () => {
    const {userInfo} = useChat();
    return useMutation(
            (data) => axiosInstance.post('/api/message',data),
            {
                onSuccess:(result)=>{
                    socket.emit('message-sent',result.data);
                },
                onError:(err)=>{
                    console.log(err);
                }
            }
        );
}



export const useGetMessages = () => {
    const {dispatchMessages} = useChat();
    return useMutation(
        (chat_id) => axiosInstance.get(`/api/message/${chat_id}`),
          {    
            onSuccess:(result)=>{
                console.log(result);
                dispatchMessages({type:"SET_MESSAGES",payload:result.data});
            },
            onError:(err)=>{
                console.log(err);
            }
          }
      );

  }
