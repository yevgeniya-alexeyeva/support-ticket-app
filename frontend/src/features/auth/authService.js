import axios from "axios";

// const API_URL = "/user/";

const register = async (user) => {
  const { data } = await axios.post(
    "http://localhost:5000/user/register",
    user
  );
  if (data) localStorage.setItem("user", JSON.stringify(data));
  return data;
};

const login = async (user) => {
  const { data } = await axios.post("http://localhost:5000/user/login", user);

  if (data) localStorage.setItem("user", JSON.stringify(data));
  return data;
};

const logout = async (user) => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
