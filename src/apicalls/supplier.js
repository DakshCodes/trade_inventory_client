import {axiosInstance} from "./axiosInstance";


// add a new supplier

export const AddSupplier = async(payload) =>{
    try {
        const response = await axiosInstance.post("/api/suppliers/add-supplier" , payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}


// Get suppliers
export const GetSuppliers = async() =>{
    try {
        const response = await axiosInstance.get("/api/suppliers/get-supplier");
        return response.data;
    } catch (error) {
        return error.message;
    }
}

// edit a supplier
export const EditSupplier = async(id,payload) =>{
    try {
        const response = await axiosInstance.put(`/api/suppliers/edit-supplier/${id}`, payload);
        return response.data
    } catch (error) {
        return error.message;
    }
}

// delete supplier
export const DeleteSupplier = async(id) =>{
    try {
        const response = await axiosInstance.delete(`/api/suppliers/delete-supplier/${id}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
}