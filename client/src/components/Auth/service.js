import axiosInstance from '../../lib/axios.config';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

export const registerUser = async(data)=>{
    const result =  await axiosInstance.post('/api/user/signup',data);
    cookies.set('token',result.data.token,{path:'/', maxAge:60*60*24*7});
    return result.data;
}


