import { axiosInstance } from "./axiosInstance";


// add a new supplier

export const AddFinishProduct = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/finishproduct/add-finishproduct", payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}


// Get suppliers
export const GetFinishProduct = async () => {
    try {
        const response = await axiosInstance.get("/api/finishproduct/get-finishproduct");
        return response.data;
    } catch (error) {
        return error.message;
    }
}

// edit a supplier
export const EditFinishProduct = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`/api/finishproduct/edit-finishproduct/${id}`, payload);
        return response.data
    } catch (error) {
        return error.message;
    }
}

// delete supplier
export const DeleteFinishProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/finishproduct/delete-finishproduct/${id}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}