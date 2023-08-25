import { axiosInstance } from "./axiosInstance";


// add a new supplier

export const AddPProduct = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/process/add-product", payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}


// Get suppliers
export const GetPProduct = async () => {
    try {
        const response = await axiosInstance.get("/api/process/get-product");
        return response.data;
    } catch (error) {
        return error.message;
    }
}

// edit a supplier
export const EditPProduct = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`/api/process/edit-product/${id}`, payload);
        return response.data
    } catch (error) {
        return error.message;
    }
}
// edit a supplier
export const EditPProduct2 = async (id, payload) => {
    try {
        const response = await axiosInstance.put(`/api/process/edit-product2/${id}`, payload);
        return response.data
    } catch (error) {
        return error.message;
    }
}

// delete supplier
export const DeletePProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/process/delete-product/${id}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}