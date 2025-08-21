import api from "./axiosInstance";

const loginUser = async (username, password) => {
  try {
    const response = await api.post(
      "/auth/login",
      { username, password }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const registerUser = async (username, password) => {
  try {
    const response = await api.post(
     "/auth/register",
      { username, password }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const e2p = (s) => s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

export { loginUser, registerUser , e2p};
