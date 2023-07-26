import { axiosInstance } from "./axiosInstance";


// add a new supplier

export const AddMaterialType = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/materialtype/add-materialtype", payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}


// Get suppliers
export const GetMaterialType = async () => {
    try {
        const response = await axiosInstance.get("/api/materialtype/get-materialtype");
        return response.data;
    } catch (error) {
        return error.message;
    }
}

// edit a supplier
export const EditMaterialType = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`/api/materialtype/edit-materialtype/${id}`, payload);
        return response.data
    } catch (error) {
        return error.message;
    }
}

// delete supplier
export const DeleteMaterialType = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/materialtype/delete-materialtype/${id}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}