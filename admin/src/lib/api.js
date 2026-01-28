import axiosInstance from "./axios";

export const productApi = {
  getAll: async ({ page = 1, limit = 20, category = "All" } = {}) => {
    const params = new URLSearchParams({ page, limit });
    if (category && category !== "All") {
      params.append("category", category);
    }
    const { data } = await axiosInstance.get(`/admin/products?${params}`);
    return data;
  },

  create: async (formData) => {
    const { data } = await axiosInstance.post("/admin/products", formData);
    return data;
  },

  update: async ({ id, formData }) => {
    const { data } = await axiosInstance.put(`/admin/products/${id}`, formData);
    return data;
  },

  delete: async (id) => {
    const { data } = await axiosInstance.delete(`/admin/products/${id}`);
    return data;
  },
};

export const orderApi = {
  getAll: async () => {
    const { data } = await axiosInstance.get("/admin/orders");
    return data;
  },

  updateStatus: async ({ orderId, status }) => {
    const { data } = await axiosInstance.patch(
      `/admin/orders/${orderId}/status`,
      { status },
    );
    return data;
  },
};

export const statsApi = {
  getDashboard: async () => {
    const { data } = await axiosInstance.get("/admin/stats");
    return data;
  },
};
