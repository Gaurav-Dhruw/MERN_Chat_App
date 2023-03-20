import {io} from 'socket.io-client';

export const socket = io("https://chatico.onrender.com",{
    withCredentials:true
});