import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosInstance } from "./useAxiosInstance";

const useSpares = () => {
  const axiosInstance = useAxiosInstance(true);
  const fetchSpares = async () => {
    try {
      const res = await axiosInstance.get("/admin/spares/getAll");
      return res.data;
    } catch (error) {
      console.log("Error fetching spares:", error.message);
    }
  };

  return useQuery({ queryKey: ["spares"], queryFn: fetchSpares });
};

const useAddSpare = () => {
  const axiosInstance = useAxiosInstance(true);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (spare) => {
      const response = await axiosInstance.post("/admin/spares/add", spare);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("spares");
      console.log("Spare added successfully:", data);
    },
    onError: (error) => {
      console.error("Error adding spare:", error.me);
    },
  });
};

const useDeleteSpare = () => {
  const axiosInstance = useAxiosInstance(true);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/admin/spares/delete/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("spares");
      console.log("Spare deleted successfully:", data);
    },
    onError: (error) => {
      console.error("Error deleting spare:", error.message);
    },
  });
};

const useUpdateSpare = () => {
  const axiosInstance = useAxiosInstance(true);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (spare) => {
      const response = await axiosInstance.put("/admin/spares/update", spare);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("spares");
      console.log("Spare updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating spare:", error.message);
    },
  });
};

export { useSpares, useAddSpare, useDeleteSpare, useUpdateSpare };
