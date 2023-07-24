import { axiosInstance } from "./axiosInstance";


// add a new supplier

export const AddMaterialType = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/rawmaterialtype/add-rawmaterialtype", payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}


// Get suppliers
export const GetMaterialType = async () => {
    try {
        const response = await axiosInstance.get("/api/rawmaterialtype/get-rawmaterialtype");
        return response.data;
    } catch (error) {
        return error.message;
    }
}

// edit a supplier
export const EditMaterialType = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`/api/rawmaterialtype/edit-rawmaterialtype/${id}`, payload);
        return response.data
    } catch (error) {
        return error.message;
    }
}

// delete supplier
export const DeleteMaterialType = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/rawmaterialtype/delete-rawmaterialtype/${id}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}