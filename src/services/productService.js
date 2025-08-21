import api from "./axiosInstance";

const getProducts = async (
  page = 1,
  limit = 6,
  name = "",
  minPrice,
  maxPrice,
  
) => {
  try {
    const params = { page, limit };
     if (page && page > 0) params.page = page;
    if (name) params.name = name;
    if (minPrice !== undefined) params.minPrice = minPrice;
    if (maxPrice !== undefined) params.maxPrice = maxPrice;
    

    const res = await api.get("/products", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const addProduct = async (productData) => {
  const res = await api.post("/products", productData);
  return res.data;
};

const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

const updateProduct = async ({ id, data }) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

const deleteMultiplieProducts = async (ids) => {
  const res = await api.delete("/products", { data: { ids } });
};

export {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  deleteMultiplieProducts,
};
