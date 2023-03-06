import { useMutation} from "react-query";
import axiosInstance from '../lib/axios.config';


export const useLoginUser = () =>{
    
    return useMutation(
        (data) => axiosInstance.post('/api/user/login',data),
        {
            onSuccess:(data)=>{
                localStorage.setItem('token',JSON.stringify(data.data.token));
            },
            onError:(error)=>{
                console.log(error);
            },
        }
    );
}


export const useSignUpUser = ()=>{
    return useMutation(
        (data) => axiosInstance.post('/api/user/signup',data),
        {
            onSuccess:(data)=>{
                localStorage.setItem('token',JSON.stringify(data.data.token));

            },
            onError:(error)=>{
                console.log(error.message);
            },
        }
    );
}

export const useOAuth = ()=>{
    return useMutation(
        (data) => axiosInstance.post('/api/user/oauth',data),
        {
            onSuccess:(data)=>{
                // console.log(data.data);
                localStorage.setItem('token',JSON.stringify(data.data.token));
            },
            onError:(error)=>{
                console.log(error.message);
            },
        }
    );
}