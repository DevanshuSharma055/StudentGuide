import axiosInstance from "../Utils/AxiosInstance";

export const loginUserRequest = (reqData: any) => {
  return axiosInstance
    .post("/user/LogIn", reqData)
    .then((res: any) => res);
};

export const userLogOutRequest = () => {
  return axiosInstance.post("/user/Logout").then((res: any) => res);
};


export const userAuthFromBackend = () =>{
    return axiosInstance.get("/user/me").then((res: any) => res.data);

};

export const signupUserRequest = (reqData: any) => {
  return axiosInstance.post("/user/SignIn", reqData).then((res: any) => res.data);
}

export const verifyOtp = (reqData: any) => {
  return axiosInstance.post('/user/VerfiyOtp', reqData).then((res: any) => res.data);
}

export const sendOtpToEmail = (reqData: any) => {
  return axiosInstance.post('/user/SendOtp', reqData).then((res: any) => res.data);
}

export const updatePassword = (reqData: any) => {
  return axiosInstance.post('/user/ForgetPassword', reqData).then((res: any) => res.data);
}

export const verifyEmail = (reqData: any) => {
    return axiosInstance.post('/user/verfiyMail', reqData).then((res: any) => res.data);
}

export const googleAuth = (token: any) =>{
  return axiosInstance.post('/user/GoogleLogin',{ token: token }).then((res: any) => res);
}

export const getReport = (text: string) =>{
  return axiosInstance.post('/user/GetReport',{text:text}).then((res:any) => res);
}