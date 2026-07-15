import api from "./axios"; // apni existing axios instance import karo

// FormData bhejna hai kyunki image file hai
export const updateProfile = (formData) =>
  api.put("/users/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteAccount = () => api.delete("/users/account");