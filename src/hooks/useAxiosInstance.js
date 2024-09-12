import { useAuth } from "../contexts/auth";
import axios from "axios";

/**
 * Custom hook to create and configure an Axios instance with optional authorization headers.
 *
 * @function useAxiosInstance
 * @param {boolean} isAuth - A boolean indicating whether the Axios instance should include authorization headers.
 *                           If `true`, the authorization header will be added using the current user's token.
 *                           If `false`, no authorization header will be included.
 *
 * @returns {AxiosInstance} - Returns a configured Axios instance for making HTTP requests.
 *
 * @example
 * // Example usage in a component:
 * const axiosInstance = useAxiosInstance(true);
 *
 * axiosInstance.get('/some-protected-route')
 *   .then(response => console.log(response.data))
 *   .catch(error => console.error('Error:', error));
 */
export const useAxiosInstance = (isAuth) => {
  const { user } = useAuth();
  let obj = {
    baseURL: import.meta.env.VITE_SERVER_URL,
  };

  if (isAuth === true) {
    obj["headers"] = {
      //"Content-Type": "multipart/form-data",
      authorization: user,
    };
  }
  const instance = axios.create(obj);

  return instance;
};
