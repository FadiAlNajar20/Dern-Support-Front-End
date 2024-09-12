import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAxiosInstance } from "./useAxiosInstance";

const useFeedback = (id) => {
  const axiosInstance = useAxiosInstance(true);

  const fetchFeedback = async () => {
    const response = await axiosInstance.get(
      `/admin/feedback/relatedToService/avg/${id}`
    );
    // console.log("Feedback data:", response.data);
    return response.data;
  };
  return useQuery({
    queryKey: ["feedback", id],
    queryFn: () => fetchFeedback(id),
    enabled: !id,
  });
};

export { useFeedback };
