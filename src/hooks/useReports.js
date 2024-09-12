// useReports.js
import { useQuery } from "@tanstack/react-query";
import { useAxiosInstance } from "./useAxiosInstance";

export const useReports = () => {
  const axiosInstance = useAxiosInstance(true);

  const fetchReports = async () => {
    try {
      const res = await axiosInstance.get("/admin/reports");
      return res.data;
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw new Error("Failed to fetch reports");
    }
  };

  return useQuery({
    queryKey: ["reports"],
    queryFn: fetchReports,
    // Optionally, you can add configurations like `enabled`, `staleTime`, etc.
  });
};
