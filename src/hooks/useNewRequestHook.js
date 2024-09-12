import { useQuery, useMutation } from "@tanstack/react-query";

import { useAxiosInstance } from "./useAxiosInstance";
// Custom hook to get an axios instance


// Custom hook to update a service
const usenewRequest = () => {
  const axiosInstance = useAxiosInstance(true);
  return useMutation({

    mutationFn: async (requestData) => {

      const response = await axiosInstance.post("/customers/send-support-request", requestData);
      
 
      return response.data;
    },
    onSuccess: (data) => {
      console.log("request estmate successfully:", data);
    },
    onError: (error) => {
      console.error("Error editing service:", error);
    },
  });
};

const useApproveRequest = () => {
  const axiosInstance = useAxiosInstance(true);
  return useMutation({

    mutationFn: async (requestData) => {
   
      const response = await axiosInstance.post("/customers/final-approval-support-request", requestData,{
        headers: {
        "Content-Type": "multipart/form-data"}

      });
      
    
      return response.data;
    },
    onSuccess: (data) => {
      console.log("request estmate successfully:", data);
    },
    onError: (error) => {
      console.error("Error editing service:", error);
    },
  });
};

const useSendServiceRequest = () => {
  const axiosInstance = useAxiosInstance(true);

  return useMutation({
    mutationFn: async (requestData) => {
      console.log(requestData);
      
      const response = await axiosInstance.post("/customers/send-service-request", requestData);
      console.log(response.data);
      
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Service request sent successfully:", data);
    },
    onError: (error) => {
      console.error("Error sending service request:", error);
    },
  });
};





export { usenewRequest ,useApproveRequest, useSendServiceRequest};
