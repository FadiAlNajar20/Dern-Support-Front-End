// useAdminQueries.js
import { useQuery } from "@tanstack/react-query";
import { useAxiosInstance } from "./useAxiosInstance";


export const useServicesUsageRate = () => {
  const axiosInstance = useAxiosInstance(true);

  const fetchServicesUsageRate = async () => {
    try {
      const res = await axiosInstance.get("/admin/services/usageRate");
      return res.data;
    } catch (error) {
      console.log("Error fetching services usage rate:", error);
    }
  };

  return useQuery({ queryKey: ["servicesUsageRate"], queryFn: fetchServicesUsageRate });
};


export const useServicesRatings = () => {
  const axiosInstance = useAxiosInstance(true);

  const fetchServicesRatings = async () => {
    try {
      const res = await axiosInstance.get("/admin/services/getRatings");
      return res.data;
    } catch (error) {
      console.log("Error fetching services ratings:", error);
    }
  };

  return useQuery({ queryKey: ["servicesRatings"], queryFn: fetchServicesRatings });
};


export const useServicesPerDay = () => {
  const axiosInstance = useAxiosInstance(true);

  const fetchServicesPerDay = async () => {
    try {
      const res = await axiosInstance.get("/admin/services/servicesPerDay");
      return res.data;
    } catch (error) {
      console.log("Error fetching services per day:", error);
    }
  };

  return useQuery({ queryKey: ["servicesPerDay"], queryFn: fetchServicesPerDay });
};
