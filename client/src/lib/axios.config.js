import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "https://chatico.onrender.com",
  headers: {
    "Content-type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  req =>{
    const token = JSON.parse(localStorage.getItem('token'));

    if(token) {
      req.headers.Authorization = `Bearer ${token}`;  
    }
    return req;
  },
  error=> Promise.reject(error)
  
)

export default axiosInstance;