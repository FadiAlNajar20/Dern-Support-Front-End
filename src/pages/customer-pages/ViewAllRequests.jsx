import FeedbackModal from "../../components/modals/FeedbackModal";
import { useState, useEffect } from "react";
import { Filters, requestStatus } from "../../utils/Constants";
import CustomTable from "../../components/CustomTable";
import {
  useFeedback,
  useRequests,
  useSendFeedback,
} from "../../hooks/customerHooks";
import Loading from "../../components/Loading";
import moment from "moment/moment";

const headers = ["Title", "Status", "Rate", "Cost", "Date"];

const ViewAllRequests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { data: requests, isLoading } = useRequests();
  const [filters, setFilters] = useState(new Set());
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filterRequest, setFilterRequest] = useState("all");

  if (isLoading) {
    return <Loading />;
  }

  useEffect(() => {
    if (requests) {
      const filtered = Array.from(filters).length
        ? requests.filter((request) => filters.has(request.status))
        : requests;
      setFilteredRequests(filtered);
    }
  }, [requests, filters]);

  const toggleModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(!isModalOpen);
  };

  const RenderRow = (request) => {
    const isNewRequest = request.requestType == "NewRequest";

    return (
      <>
        <td className="p-4">{request.title}</td>
        <td className="p-4">
          <span
            className={`inline-block px-2 py-1 rounded-full text-white ${request.status == requestStatus.completed
              ? "bg-green-500"
              : request.status == requestStatus.inProgress
                ? "bg-blue-400"
                : "bg-yellow-400"
              }`}
          >
            {request.status}
          </span>
        </td>
        <td className="p-4">
          <button
            onClick={() => toggleModal(request)}
            className={`py-2.5 px-3 font-semibold rounded-md border-2 transition-all duration-300 ease-in-out 
                            ${!isNewRequest &&
                request.status == requestStatus.completed
                ? "bg-sky-500 text-white cursor-pointer hover:bg-sky-600"
                : "bg-gray-300 text-gray-400 cursor-not-allowed"
              }
                      `}
            disabled={isNewRequest || request.status != requestStatus.completed}
          >
            {isNewRequest
              ? "This is a new request"
              : request.feedbackId
                ? "View Feedback"
                : "Rate the service"}
          </button>
        </td>
        <td className="p-4">
          {request.actualCost
            ? "$" + request.actualCost
            : "Price is not determined yet"}
        </td>
        <td className="p-4">
          {moment(request.estimatedTime).format("YYYY-MM-DD")}
        </td>
      </>
    );
  };

  const filteredRequest = (filterRequest === "all"
    ? filteredRequests
    : filteredRequests?.filter((request) => request?.status === filterRequest))
  return (
    <>
      {isModalOpen && (
        <FeedbackModal
          serviceId={selectedRequest.serviceId}
          onRequestClose={toggleModal}
        />
      )}
      <div className="p-10 grow gap-5 pt-36">
        <div className="mb-4 flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <select
            value={filterRequest}
            onChange={(e) => setFilterRequest(e.target.value)}
            className="p-2 border border-gray-300 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-indigo-700"
          >
            <option value="all">All Requests</option>
            <option value={requestStatus.pending}>{requestStatus.pending}</option>
            <option value={requestStatus.completed}>{requestStatus.completed}</option>
            <option value={requestStatus.inProgress}>{requestStatus.inProgress}</option>
          </select>
        </div>
        <CustomTable
          headers={headers}
          data={filteredRequest}
          renderRow={RenderRow}
        />
      </div>
    </>
  );
};

export default ViewAllRequests;
