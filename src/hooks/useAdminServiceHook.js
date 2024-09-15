import { useQuery, useMutation } from "@tanstack/react-query";

import { useAxiosInstance } from "./useAxiosInstance";
// Custom hook to get an axios instance


// Custom hook to fetch services
const useSeriveces = () => {
  const axiosInstance = useAxiosInstance();
  const fetchService = async () => {
    try {
      const res = await axiosInstance.get("/common/services/getAll");
      return res.data;
    } catch (error) {
      console.log("Error fetching services:", error);
      throw error; // Ensure error is thrown to trigger isError state
    }
  };

  return useQuery({ queryKey: ["service"], queryFn: fetchService });
};

// Custom hook to update a service
const useUpdateService = () => {
  const axiosInstance = useAxiosInstance(true);
  return useMutation({
    mutationFn: async (service) => {
      const response = await axiosInstance.put("/admin/services/update", service);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Service updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error editing service:", error);
    },
  });
};
const useDeleteService = () => {
  const axiosInstance = useAxiosInstance(true);
  return useMutation({
    mutationFn: async (serviceId) => {
      const response = await axiosInstance.delete(`/admin/services/delete/${serviceId}` );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Service updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error editing service:", error);
    },
  });
};
const useNewService = () => {
  const axiosInstance = useAxiosInstance(true);
  return useMutation({

    mutationFn: async (requestData) => {
   console.log(requestData);
   
      const response = await axiosInstance.post("/admin/services/add", requestData,{
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

// /admin/support-requests/getAll
const usesSpportRequestsGetAll = () => {
  const axiosInstance = useAxiosInstance(true);
  const fetchSpportRequests = async () => {
    try {
      const res = await axiosInstance.get("/admin/support-requests/getAll");
      return res.data;
    } catch (error) {
      console.log("Error Support Requests:", error);
      throw error;
    }
  };

  return useQuery({ queryKey: ["support-requests"], queryFn: fetchSpportRequests });
};

export { useSeriveces, useUpdateService, useDeleteService, usesSpportRequestsGetAll ,useNewService };
