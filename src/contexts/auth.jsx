import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";  // Import SweetAlert2
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const apiBaseUrl = import.meta.env.VITE_SERVER_URL;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("token") || null);

  const apiUrlRegister = `${apiBaseUrl}/customers/signup`;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token);
    }
  }, []);

  const registerUser = async (userData) => {
    try {
      const res = await axios.post(apiUrlRegister, userData);

      console.log(res.data);

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Registration successful!",
          text: "Please check your email to verify your account.",
        });
        navigate("/login?userType=customers");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.data.msg,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: "There was an error during registration.",
      });
    }
  };

  // Function to log in a user
  const loginUser = async (userData) => {
    console.log(userData);

    const apiUrlLogin = `${apiBaseUrl}/${userData.userType}/login`;
    try {
      const res = await axios.post(apiUrlLogin, userData);

      if (res.data.success) {
        setUser(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userType", userData.userType);
        Swal.fire({
          icon: "success",
          title: "Login successful!",
        });
        return res;
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Error",
          text: res.data.msg || "Login failed.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "There was an error during login.",
      });
    }
  };

  const logoutUser = async () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("Email");
    navigate("/");
    Swal.fire({
      icon: "success",
      title: "Logout successful!",
    });
  };

  const contextData = {
    user,
    loginUser,
    registerUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
