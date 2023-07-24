import { axiosInstance } from "./axiosInstance";


// add a new supplier

export const AddMaterial = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/rawmaterial/add-rawmaterial", payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}


// Get suppliers
export const GetMaterial = async () => {
    try {
        const response = await axiosInstance.get("/api/rawmaterial/get-rawmaterial");
        return response.data;
    } catch (error) {
        return error.message;
    }
}

// edit a supplier
export const EditMaterial = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`/api/rawmaterial/edit-rawmaterial/${id}`, payload);
        return response.data
    } catch (error) {
        return error.message;
    }
}

// delete supplier
export const DeleteMaterial = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/rawmaterial/delete-rawmaterial/${id}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}