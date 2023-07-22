import {axiosInstance} from "./axiosInstance";


// add a new Firm

export const AddFirm = async(payload) =>{
    try {
        const response = await axiosInstance.post("/api/firms/add-firm" , payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}


// Get Firms
export const GetFirms = async() =>{
    try {
        const response = await axiosInstance.get("/api/firms/get-firm");
        return response.data;
    } catch (error) {
        return error.message;
    }
}

// edit a Firm
export const EditFirm = async(id,payload) =>{
    try {
        const response = await axiosInstance.put(`/api/firms/edit-firm/${id}`, payload);
        return response.data
    } catch (error) {
        return error.message;
    }
}

// delete Firm
export const DeleteFirm = async(id) =>{
    try {
        const response = await axiosInstance.delete(`/api/firms/delete-firm/${id}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}