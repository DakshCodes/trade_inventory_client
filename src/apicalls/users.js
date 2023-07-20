import {axiosInstance} from "./axiosInstance";

// register user
export const RegisterUser = async(payload)=>{
    try {
        const response = await axiosInstance.post("/api/users/register",payload);
        return response.data;
    } catch (error) {
        return error.message 
    }
}

// login user
export const LoginUser = async(payload)=>{
    try {
        const response =  await axiosInstance.post("/api/users/login" , payload);
        return response.data;
    } catch (error) {
        return error.message 
    }
}

// get current user
export const GetCurrentUser = async()=>{
    try {
        const response =  await axiosInstance.get("/api/users/get-current-user");
        return response.data;
    } catch (error) {
        return error.message 
    }
}
// get current user
export const VerifyMessgae = async(token)=>{
    try {
        const response =  await axiosInstance.get(`/api/users/confirm/${token}`);
        return response.data;
    } catch (error) {
        return error.message 
    }
}


// Send Email
export const SendEmail = async(payload)=>{
    try {
        const response =  await axiosInstance.post("/api/users/send-email" , payload);
        return response.data;
    } catch (error) {
        return error.message 
    }
}

export const ResetPasswordHandler = async(payload,id,token)=>{
    try {
        const response =  await axiosInstance.put(`/api/users/${id}/reset-password/${token}` , payload);
        return response.data;
    } catch (error) {
        return error.message 
    }
}