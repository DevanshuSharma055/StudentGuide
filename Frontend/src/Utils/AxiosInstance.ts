import axios from 'axios';

console.log('check', process.env.REACT_APP_API_URL)
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers:{
        "Content-Type": "application/json",
    },
    withCredentials: true,
})


export default axiosInstance;