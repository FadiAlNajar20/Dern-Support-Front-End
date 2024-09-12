import { useQuery, useMutation } from "@tanstack/react-query";
import { useAxiosInstance } from "./useAxiosInstance";



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

    return useQuery({ queryKey: ["supportRequests"], queryFn: fetchSpportRequests });
};


// /common/articles/getAll
const useGetAllArticles = () => {
    const axiosInstance = useAxiosInstance(true);
    const fetchAllArtivles = async () => {
        try {
            const res = await axiosInstance.get("/common/articles/getAll");
            return res.data;
        } catch (error) {
            console.log("Error Support Requests:", error);
            throw error;
        }
    };

    return useQuery({ queryKey: ["articles"], queryFn: fetchAllArtivles });
}

const useAddArticle = () => {
    const axiosInstance = useAxiosInstance(true);

    const addArticle = async (newArticle) => {       
        try {
            const formData = new FormData();
            formData.append("title", newArticle.title);
            if (newArticle.image) {
                formData.append("image", newArticle.image);
            };
            formData.append("description", newArticle.description);

            const res = await axiosInstance.post("/admin/articles/add", formData,
                 { headers: { 'content-type': 'multipart/form-data' }});
            return res.data;
        } catch (error) {
            console.log("Error adding article:", error);
            throw error;
        }
    };

    return useMutation({
        mutationFn: addArticle,
        onSuccess: (data) => {
            console.log("Article Added successfully:", data);
        },
        onError: (error) => {
            console.error("Error adding Article:", error);
        }
    });
};


// /admin/support-requests/update
const useUpdateArticle = () => {
    const axiosInstance = useAxiosInstance(true);

    const updateArticle = async (u) => {
        try {
            const res = await axiosInstance.put("/admin/articles/update", u);
            return res.data;
        } catch (error) {
            console.log("Error adding article:", error);
            throw error;
        }
    };

    return useMutation({
        mutationFn: updateArticle,
    });
};

// admin/articles/delete/:id
const useDeleteArticle = () => {
    const axiosInstance = useAxiosInstance(true);

    const deleteArticle = async (id) => {

        try {
            const res = await axiosInstance.delete(`/admin/articles/delete/${id}`);
            return res.data;
        } catch (error) {
            console.log("Error delete article:", error);
            throw error;
        }
    };

    return useMutation({
        mutationFn: deleteArticle,
    });
};


// admin/technicians/createAccount

export const useCreateTechnicianAccount = () => {
    const axiosInstance = useAxiosInstance(true);

    const createTechnicianAccount = async (newTech) => {
        console.log(newTech);
        
        try {
            const res = await axiosInstance.post("/admin/technicians/createAccount", newTech);
            return res.data;
        } catch (error) {
            console.log("Acount ", error);

            throw error;
        }
    };

    return useMutation({
        mutationFn: createTechnicianAccount,
        onSuccess: (data) => {
            console.log('Account created successfully:', data);
            return true;
        },
        onError: (error) => {
            console.error('Error creating account:', error);
            return;
        }
    });
};


//  /admin/support-requests-timeAndCost/update
const useSupportRequestsTimeAndCost = () => {
    const axiosInstance = useAxiosInstance(true);
    return useMutation({
        mutationFn: async (u) => {
            console.log("this u", u);
          const response = await axiosInstance.put("/admin/support-requests-timeAndCost/update", u);
          return response.data;
        },
        onSuccess: (data) => {
          console.log("Service updated successfully:", data);
        },
        onError: (error) => {
          console.error("Error editing service:", error);
        },
      });
    // console.log("Call the updateTimeAndCost", u);
    // const obj = {
    //     id: user?.id,
    //     maintenanceTime: actualcost,
    //     actualcost: createddate
    // }
    // const updateTimeAndCost = async () => {
        
    //     try {
    //         const res = await axiosInstance.put("/admin/support-requests-timeAndCost/update", u);
    //         console.log(" updated Time and Cost: ", res.status);
            
    //         return res.data;
    //     } catch (error) {
    //         console.log("Error updated Time and Cost:", error);
    //         throw error;
    //     }
    // };

    // return useMutation({
    //     mutationFn: updateTimeAndCost,
    //     onSuccess: (data) => {
    //         console.log('Account updated successfully:', data);
    //     },
    //     onError: (error) => {
    //         console.error('Error updated Time and Cost:', error);
    //     }
    // });
};

export { usesSpportRequestsGetAll, useGetAllArticles, useUpdateArticle, useDeleteArticle, useAddArticle, useSupportRequestsTimeAndCost };