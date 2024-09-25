import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
        toast.success(
          "Registration successful! Please check your email to verify your account."
        );
        navigate("/");
      } else {
        toast.error(res.data.msg); 
      }
    } catch (error) {
      toast.error("Registration failed.");
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
        toast.success("Login successful!"); 
        return res; 
      } else {
        toast.error(res.error.msg);
      }
    } catch (error) {
      toast.error("Login failed.");
    }
  };

  const logoutUser = async () => {
    setUser(null);
    localStorage.removeItem("token"); 
    localStorage.removeItem("Email"); 
    navigate("/");
    toast.success("Logout successful!"); 
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