import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Create a Context for authentication
const AuthContext = createContext();

const apiBaseUrl = import.meta.env.VITE_SERVER_URL;


export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes
  const [user, setUser] = useState(localStorage.getItem("token") || null); // State to store user token (fetched from localStorage if available)

  const apiUrlRegister = `${apiBaseUrl}/customers/signup`; // API URL for user registration

  // Effect to check and set user token from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(token); // Set token as the logged-in user if available
    }
  }, []);

  // Function to register a new user
  const registerUser = async (userData) => {
    try {
      // Send POST request to registration API
      const res = await axios.post(apiUrlRegister, userData);

      console.log(res.data); // Log response for debugging purposes

      if (res.data.success) {
        // Display success toast notification and ask user to verify email
        toast.success(
          "Registration successful! Please check your email to verify your account."
        );

        // Redirect user to the email verification page
        navigate("/");
      } else {
        toast.error(res.data.msg); // Display error toast if registration fails
      }
    } catch (error) {
      toast.error("Registration failed."); // Display generic error message on failure
    }
  };

  // Function to log in a user
  const loginUser = async (userData) => {
  
    console.log(userData);

    const apiUrlLogin = `${apiBaseUrl}/${userData.userType}/login`;
    try {
 
      // Send POST request to login API
      const res = await axios.post(apiUrlLogin, userData);
     
      if (res.data.success) {
        // On successful login, store the token and update the user state
        setUser(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userType", userData.userType);
         // Save token to localStorage
        toast.success("Login successful!"); // Display success message
        return res; // Return response for further handling
      } else {
        toast.error(res.error.msg); // Display error message if login fails
      }
    } catch (error) {
      toast.error("Login failed."); // Display generic error message on failure
    }
  };

  // Function to log out the user
  const logoutUser = async () => {
    setUser(null); // Clear the user state
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("Email"); // Optionally remove email from localStorage
    navigate("/"); // Redirect to home page
    toast.success("Logout successful!"); // Display success message
  };

  // Data to be provided through context (available to any component using this context)
  const contextData = {
    user,
    loginUser,
    registerUser,
    logoutUser,
  };

  // Provide authentication context data to children components
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use the authentication context in components
export const useAuth = () => useContext(AuthContext);

export default AuthContext;

// Token expiration handling section (optional)

// Example axios interceptor to handle token expiration
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const api = axios.create({
//   baseURL: 'http://localhost:5000', // Base API URL
// });

// // Intercept API responses to handle expired tokens
// api.interceptors.response.use(
//   (response) => response, // Return response if no error
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // If the response status is 401 (Unauthorized), remove the token from localStorage
//       localStorage.removeItem('token');
//       localStorage.removeItem('Email');
//     }
//     return Promise.reject(error); // Reject the error to handle it elsewhere
//   }
// );
