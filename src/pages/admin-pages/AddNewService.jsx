import { useState, useEffect } from "react";
import Loading from "../../components/Loading";

import RequestForm from "../../components/RequestForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useNewService } from "../../hooks/useAdminServiceHook";

function AddNewService(id) {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [feedbackType, setFeedbackType] = useState(""); // "success" or "error"
  const location = useLocation();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({});
  const newServiceMutation=useNewService();

console.log(location.state.service);

  useEffect(() => {
    if (location.state?.service) {
      setInitialValues(location.state.service);
      
    } else {
      navigate("/support-requests/getAll"); // Redirect if no service data
    }
  }, [location.state, navigate]);

  const handleSubmit = async (data) => {
  
    setLoading(true);
    setFeedback(null); // Clear previous feedback
  

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", data.Title);
      formDataToSend.append("issueDescription", data.Description);
      formDataToSend.append("category", data.Category);
      formDataToSend.append("actualcost", data.actualCost);
      formDataToSend.append("maintenanceTime", data.maintenanceTime);
      formDataToSend.append("isCommon", data.isCommon);
      formDataToSend.append("customerId", initialValues.id);
      
      if (data.image) {
        formDataToSend.append("image", data.image);
      }
     
      const response=await newServiceMutation.mutateAsync(formDataToSend);
      console.log(response);
      

      setFeedbackType("success");
      setFeedback("Successfully added the new service");
    } catch (error) {
      setFeedbackType("error");
      setFeedback("Failed to add the new service. Please try again.");
    } finally {
      setLoading(false);
      // navigate("/support-requests/getAll"); // Redirect if no service data
      setTimeout(() => {
        setFeedback(null); // Clear feedback after 5 seconds
      }, 5000);
    }
  };

 
  return (
    <div className="max-w-[700px] mx-auto p-6 bg-white rounded-lg shadow-lg">
      {loading && <Loading />}
      <h2 className="text-2xl font-bold text-center mb-6">Add New Service</h2>
      <div className="w-full">
        <RequestForm onSubmit={handleSubmit} initialValues={initialValues} loading={loading} flag="admin" />
      </div>

      {feedback && (
        <div
          className={`mt-6 p-4 rounded-lg text-center shadow-md ${
            feedbackType === "success"
              ? "bg-green-100 border border-green-300 text-green-800"
              : "bg-red-100 border border-red-300 text-red-800"
          }`}
        >
          <h3 className="text-lg font-semibold">{feedback}</h3>
        </div>
      )}
    </div>
  );
}

export default AddNewService;
