import axios from "axios";

const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/login`,
      { username, password }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const registerUser = async (username, password) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/register`,
      { username, password }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { loginUser , registerUser };
