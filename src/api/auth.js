import axios from "axios";

export const login = async (username, password) => {
  try {
    const res = await axios.post("https://reqres.in/api/login", {
      email: 'Bhargav@gmail.com',      
      password: 'Fake@1234'
    });

    localStorage.setItem("accessToken", res.data.token);

    return true;
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    return false; 
  }
};

export const logout = () => {
  localStorage.removeItem("accessToken");
};

