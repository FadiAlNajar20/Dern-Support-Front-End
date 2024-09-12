import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestForm from "../../../components/RequestForm";
import Loading from "../../../components/Loading";
import "./newRequest.css";
import axios from "axios";
import { useAuth } from "../../../contexts/auth";
import Modal from "react-modal";
import { FaCheckCircle } from "react-icons/fa"; // For check icon
import {
  usenewRequest,
  useApproveRequest,
} from "../../../hooks/useNewRequestHook";
// Set the root element for the modal
Modal.setAppElement("#root");

function NewRequest() {
  const newrequestMutation = usenewRequest();
  const approveRequestmutation = useApproveRequest();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [feedback, setFeedback] = useState({
    estimatedCost: 0,
    estimatedTime: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State for feedback modal visibility
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // State for success modal visibility
  const [modalMessage, setModalMessage] = useState(""); // State for modal message
  const navigate = useNavigate();
  const { user } = useAuth();

  // Function to handle form submission
  const handleSubmit = async (formData) => {
    setLoading(true); // Set loading to true while processing
    const data = { Category: formData.Category };
    try {
      // Post the form data to the backend
      const response = await newrequestMutation.mutateAsync(data);
      console.log(response);

      setData(formData);

      // Process the response data
      setFeedback({
        estimatedCost: response.EstimatedCost,
        estimatedTime: response.EstimatedTime.split("T")[0],
      });
      setModalMessage(
        "Your request has been submitted successfully. You can track the status of your request by going to the 'My Requests' page."
      );
      setIsModalOpen(true); // Open feedback modal
    } catch (error) {
      console.error("Error submitting request:", error);
      setFeedback({ error: "There was an error submitting your request." });
      setModalMessage(
        "There was an error submitting your request. Please try again later."
      );
      setIsModalOpen(true); // Open feedback modal
    } finally {
      setLoading(false); // Set loading to false after processing
    }
  };

  const handleApprove = async () => {
    setLoading(true); // Set loading to true while processing
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Title", data.Title);
      formDataToSend.append("Description", data.Description);
      formDataToSend.append("Category", data.Category);
      formDataToSend.append("DeviceDeliveryMethod", data.DeviceDeliveryMethod);
      if (data.image) {
        formDataToSend.append("image", data.image);
      }
      console.log(formDataToSend);

      const response = await approveRequestmutation.mutateAsync(formDataToSend);

      setIsModalOpen(false); // Close feedback modal
      setModalMessage(
        "Your request has been successfully approved. You can track the status of your request by going to the 'My Requests' page."
      );
      setIsSuccessModalOpen(true); // Open success modal
    } catch (error) {
      console.error("Error approving request:", error);
      setFeedback({ error: "There was an error approving your request." });
      setModalMessage(
        "There was an error approving your request. Please try again later."
      );
      setIsModalOpen(false); // Close feedback modal
      setIsSuccessModalOpen(true); // Open success modal
    } finally {
      setLoading(false); // Set loading to false after processing
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close feedback modal
    setIsSuccessModalOpen(false); // Close success modal
    navigate("/newRequest"); // Navigate back to the newRequest page
  };

  const handleGoToRequests = () => {
    setIsSuccessModalOpen(false); // Close success modal
    navigate("/allRequests"); // Navigate to my-requests page
  };

  return (
    <div className="my-14 new-request-container">
      {loading && <Loading />} {/* Show loading spinner if loading is true */}
      <h2>Submit a New Support Request</h2>
      <RequestForm onSubmit={handleSubmit} loading={loading} flag="customer" />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCancel}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h3>Request Submitted</h3>
        </div>
        <div className="modal-body">
          {feedback?.error ? (
            <p>{feedback.error}</p>
          ) : (
            <>
              <p>Estimated Cost: {feedback.estimatedCost}</p>
              <p>Estimated Time: {feedback.estimatedTime}</p>
            </>
          )}
        </div>
        <div className="modal-footer">
          <button onClick={handleApprove} className="approve-btn">
            Approve Request
          </button>
          <button onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={handleCancel}
        className="modal-content success-modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h3>Success</h3>
        </div>
        <div className="modal-body">
          <FaCheckCircle className="success-icon" />
          <p>{modalMessage}</p>
        </div>
        <div className="modal-footer">
          <button onClick={handleGoToRequests} className="go-to-requests-btn">
            View
          </button>
          <button onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default NewRequest;
