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

export { loginUser, registerUser };
