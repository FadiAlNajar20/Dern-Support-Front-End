import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosInstance } from "./useAxiosInstance";

export const useRequests = () => {
  const axiosInstance = useAxiosInstance(true);
  const fetchRequests = async () => {
    try {
      const res = await axiosInstance.get("/customers/my-requests");
      return res.data;
    } catch (error) {
      console.log("Error fetching requests:", error.message);
    }
  };

  return useQuery({ queryKey: ["myRequests"], queryFn: fetchRequests });
};

export const useFeedback = (requestId) => {
  const axiosInstance = useAxiosInstance(true);
  const fetchFeedback = async () => {
    try {
      const res = await axiosInstance.get(
        `/customers/getFeedback/${requestId}`
      );
      return res.data;
    } catch (error) {
      console.log("Error fetching feedback:", error.message);
    }
  };

  return useQuery({
    //the query key is represented in this way to distinguish each feedback
    queryKey: ["feedback", requestId],
    queryFn: fetchFeedback,
  });
};

export const useSendFeedback = (requestId) => {
  const axiosInstance = useAxiosInstance(true);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (feedback) => {
      console.log(feedback);
      
      const response = await axiosInstance.post(
        "/customers/send-feedback",
        feedback
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["feedback",requestId]);
      console.log("Feedback sent successfully:", data);
    },
    onError: (error) => {
      console.error("Error sending feedback from customersHooks:", error.me);
    },
  });
};


export const useGetArticleById = (id) => {
  const axiosInstance = useAxiosInstance(true); // Assuming this provides an Axios instance

  return useQuery({
    queryKey: ["GetArticlesById", id], // Unique key with article id
    queryFn: async () => {
      const response = await axiosInstance.get(`/common/articles/${id}`);
      return response.data;
    },
    enabled: !!id, // Only run the query if `id` is truthy
  });
};