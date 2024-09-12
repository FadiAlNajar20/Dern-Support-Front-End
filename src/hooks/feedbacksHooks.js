import { useQuery } from "@tanstack/react-query";
import { useAxiosInstance } from "./useAxiosInstance";

const useFeedbacksOnService = (serviceId) => {
  const axiosInstance = useAxiosInstance(true);
  const fetchFeedbacks = async () => {
    try {
      const res = await axiosInstance.get(
        `/admin/feedback/relatedToService/${serviceId}`
      );
      return res.data;
    } catch (error) {
      console.log("Error fetching services in feedbacksHooks:", error.message);
    }
  };

  return useQuery({ queryKey: ["feedbacks",serviceId], queryFn: fetchFeedbacks });
};

const useFeedbacksToGetAll = async () => {
  const axiosInstance = useAxiosInstance(true);
  const fetchAllFeedbacks = async () => {
    try {
      const res = await axiosInstance.get(
        `/admin/feedback/getAll`
      );
      return res.data;
    } catch (error) {
      console.log("Error fetching all Feedbacks:", error);
    }
  };

  return useQuery({ queryKey: ["allFeedbacks"], queryFn: fetchAllFeedbacks });
}

const useUser = (customerId) => {
  const axiosInstance = useAxiosInstance(true);
  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get(`/admin/users/${customerId}`);
      return res.data;
    } catch (error) {
      console.log("Error fetching user in feedbacksHooks:", error.message);
    }
  };

  return useQuery({ queryKey: ["user",customerId], queryFn: fetchUser });
};

  const useFeedbacksToGetRate = (id) => {
    // console.log(id);
    const axiosInstance = useAxiosInstance(true);
    const fetchFeedbackRate = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/feedback/relatedToService/avg/${id}`
        );
        // console.log(res.data);
        
        return res.data;
      } catch (error) {
        console.log("Error fetching services:", error);
      }
    };

    return useQuery({ queryKey: ["feedbackRate"], queryFn: fetchFeedbackRate });
  };

export { useFeedbacksOnService, useUser, useFeedbacksToGetAll, useFeedbacksToGetRate };
