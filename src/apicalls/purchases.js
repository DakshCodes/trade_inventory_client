import { axiosInstance } from "./axiosInstance";

// Add a new Purchase Order
export const AddPurchaseOrder = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/purchases/add-purchase-order", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
}

// Get Purchase Orders
export const GetPurchaseOrders = async () => {
  try {
    const response = await axiosInstance.get("/api/purchases/get-purchase-orders");
    return response.data;
  } catch (error) {
    return error.message;
  }
}

// Edit a Purchase Order
export const EditPurchaseOrder = async (id, payload) => {
  try {
    const response = await axiosInstance.put(`/api/purchases/edit-purchase-order/${id}`, payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
}

// Delete Purchase Order
export const DeletePurchaseOrder = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/purchases/delete-purchase-order/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
}

