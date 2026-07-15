import api from "./axios";

// Naya task banane ke liye (employee)
export const createTask = (data) => api.post("/tasks", data);

// Apne khud ke tasks list karne ke liye (employee)
export const getMyTasks = () => api.get("/tasks/my");

// Sabhi tasks list karne ke liye (sirf admin/manager)
export const getAllTasks = () => api.get("/tasks");

// Ek task ki details
export const getTaskById = (id) => api.get(`/tasks/${id}`);

// Task update karna (edit)
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);

// Task delete karna
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

// Approve/Reject karna (sirf admin/manager) - body: { approvalStatus, approvalRemark }
export const approveTask = (id, data) => api.put(`/tasks/${id}/approval`, data);