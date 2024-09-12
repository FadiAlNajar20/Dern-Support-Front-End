import FeedbackModal from "../../components/modals/FeedbackModal";
import { useState, useCallback, useEffect } from "react";
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

  useEffect(() => {
    console.log(requests);
    
    if (requests) {
      const filtered = Array.from(filters).length
        ? requests.filter((request) => filters.has(request.status))
        : requests;
      setFilteredRequests(filtered);
    }
  }, [requests, filters]);

  const handleFilterChange = useCallback(
    (event) => {
      setFilters((previousFilters) => {
        const newFilters = new Set(previousFilters);

        if (event.target.checked) {
          newFilters.add(event.target.value);
        } else {
          newFilters.delete(event.target.value);
        }

        return newFilters;
      });
    },
    [setFilters]
  );

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
            className={`inline-block px-2 py-1 rounded-full text-white ${
              request.status == requestStatus.completed
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
                            ${
                              !isNewRequest &&
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isModalOpen && (
        <FeedbackModal
          serviceId={selectedRequest.serviceId}
          onRequestClose={toggleModal}
        />
      )}
      <div className="p-10 grow flex gap-5 pt-36">
        <section
          className="bg-slate-200 border border-black p-2 sticky w-fit h-fit"
          aria-labelledby="filters-header"
        >
          <div className="">Filters:</div>
          <ul>
            {Filters.map((category) => (
              <li key={category} className="mb-1.5">
                <label className="inline-flex items-center gap-2 whitespace-nowrap">
                  <input
                    onChange={handleFilterChange}
                    type="checkbox"
                    value={category}
                  />
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </section>
        <CustomTable
          headers={headers}
          data={filteredRequests}
          renderRow={RenderRow}
        />
      </div>
    </>
  );
};

export default ViewAllRequests;
