import { useState } from "react";
import { useAxiosInstance } from "./useAxiosInstance";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const useAssignedRequests = () => {
  const axiosInstance = useAxiosInstance(true);
  const fetchAssignedRequests = async () => {
    try {
      const response = await axiosInstance.get("/technician/requests/assigned");
      return response.data;
    } catch (error) {
      console.log("Error fetching spares:", error.message);
    }
  };

  return useQuery({
    queryKey: ["technicianTasks"],
    queryFn: fetchAssignedRequests,
  });
};

const useTechnicianName = () => {
  const axiosInstance = useAxiosInstance(true);
  const fetchTechnicianName = async () => {
    try {
      const response = await axiosInstance.get("/technician/name");
      return response.data;
    } catch (error) {
      console.log("Error fetching technician name:", error.message);
    }
  };

  return useQuery({
    queryKey: ["technicianName"],
    queryFn: fetchTechnicianName,
  });
}

const useSpecialization = () => {
  const axiosInstance = useAxiosInstance(true);
  const fetchSpecialization = async () => {
    try {
      const response = await axiosInstance.get("/technician/specialization");
      return response.data;
    } catch (error) {
      console.log("Error fetching specialization:", error.message);
    }
  };

  return useQuery({
    queryKey: ["specialization"],
    queryFn: fetchSpecialization,
  });
};

const useUpdateRequest = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxiosInstance(true);

  const updateRequestMutation = useMutation({
    mutationFn: (data) =>
      axiosInstance.put("/technician/assigned-request/update", data),
    onSuccess: (response) => {
      console.log("Response from update request:", response.data);
      queryClient.invalidateQueries("technicianTasks");
      // Perform any additional actions if needed
    },
    onError: (error) => {
      console.error(
        "Error useUpdateRequest in technicianHooks:",
        error.message
      );
    },
  });

  return updateRequestMutation;
};

const useCompleteRequest = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxiosInstance(true);

  const completeRequestMutation = useMutation({
    mutationFn: (data) =>
      axiosInstance.put("/technician/completed-request/update", data),
    onSuccess: (response) => {
      console.log("Response from complete request:", response.data);
      queryClient.invalidateQueries("technicianTasks");
      // Perform any additional actions if needed
    },
    onError: (error) => {
      console.error(
        "Error useCompleteRequest in technicianHooks:",
        error.message
      );
    },
  });

  return completeRequestMutation;
};

const useSendReport = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxiosInstance(true);
  const [isSuccess, setIsSuccess] = useState(false); // State to track success

  const sendReportMutation = useMutation({
    mutationFn: (data) => axiosInstance.post("/technician/send-report", data),
    onSuccess: (response) => {
      console.log("Response from send report:", response.data);
      setIsSuccess(true);
      queryClient.invalidateQueries("technicianTasks");
      // Perform any additional actions if needed
    },
    onError: (error) => {
      console.error("Error useSendReport in technicianHooks:", error.message);
    },
  });

  return { mutate: sendReportMutation.mutate, isSuccess };
};

const useTechnicianCreatedDate = () => {
  const axiosInstance = useAxiosInstance(true);
  const fetchTechnicianCreatedDate = async () => {
    try {
      const response = await axiosInstance.get("/technician/createdDate");
      // console.log(response.data);
      
      return response?.data;
    } catch (error) {
      console.log("Error fetching technician created date:", error.message);
    }
  };

  return useQuery({
    queryKey: ["technicianCreatedDate"],
    queryFn: fetchTechnicianCreatedDate,
  });
};

export {
  useAssignedRequests,
  useUpdateRequest,
  useSpecialization,
  useCompleteRequest,
  useSendReport,
  useTechnicianCreatedDate,
  useTechnicianName
};
