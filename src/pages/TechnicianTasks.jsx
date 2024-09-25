import React, { useState, useCallback, useEffect } from "react";
import {
  useAssignedRequests,
  useTechnicianCreatedDate,
  useTechnicianName,
} from "../hooks/technicianHooks";
import { requestStatus } from "../utils/Constants";
import ReportModal from "../components/modals/ReportModal";
import Loading from "../components/Loading";
import LogoutButton from "../components/LogoutButton";

const headers = [
  "Title",
  "Description",
  "Request Type",
  "Status",
  "Created Date",
];

const TechnicianTasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filters, setFilters] = useState("");
  const { data: assignedRequests, isLoading, error } = useAssignedRequests();
  const {
    data: technicianCreatedDate,
    isLoading: isCreatedDateLoading,
    error: createdDateError,
  } = useTechnicianCreatedDate();
  const { data: name, isNameLoading, isNameError } = useTechnicianName();
  const currentDate = new Date();
console.log(assignedRequests);

  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getMonth() + 1
  );

  useEffect(() => {
    if (assignedRequests && technicianCreatedDate) {
      const filtered = assignedRequests.filter((request) => {
        const requestDate = new Date(request.createddate);
        const matchesStatus = filters ? request.status === filters : true;
        const matchesDate =
          requestDate.getFullYear() === selectedYear &&
          requestDate.getMonth() + 1 === selectedMonth;

        return matchesStatus && matchesDate;
      });

      setFilteredRequests(filtered);
    }
  }, [
    assignedRequests,
    technicianCreatedDate,
    selectedYear,
    selectedMonth,
    filters,
  ]);

  const handleFilterChange = useCallback((event) => {
    setFilters(event.target.value);
  }, []);

  const toggleModal = (request) => {
    setSelectedIssue(request);
    setIsModalOpen(!isModalOpen);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="mx-auto text-2xl font-bold">{error.message}</div>;
  }

  if (createdDateError) {
    return (
      <div className="mx-auto text-2xl font-bold">
        {createdDateError.message}
      </div>
    );
  }

  const createdYear = new Date(technicianCreatedDate).getFullYear();
  const createdMonth = new Date(technicianCreatedDate).getMonth() + 1;

  const yearRange = Array.from(
    { length: currentDate.getFullYear() - createdYear + 1 },
    (_, i) => createdYear + i
  );

  const isLessThanOneYear =
    currentDate.getFullYear() === createdYear &&
    currentDate.getMonth() + 1 < createdMonth;
  const monthRange = isLessThanOneYear
    ? Array.from(
      { length: currentDate.getMonth() + 1 - createdMonth + 1 },
      (_, i) => createdMonth + i
    )
    : Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <>
      {isModalOpen && (
        <ReportModal
          request={selectedIssue}
          onRequestClose={() => setIsModalOpen(false)}
        />
      )}
      <header className="w-full p-4 bg-gray-800 text-white flex justify-between">
        <h1 className="text-xl my-auto">
          {isNameLoading ? <Loading /> : isNameError ? "Error" : name}
        </h1>
        <div className="flex items-center space-x-4">
          <LogoutButton />
        </div>
      </header>

      <div className="flex items-center justify-center mt-8">
        <div className="relative inline-block">
          <span className="text-2xl md:text-4xl font-bold">
            Technican Tasks
          </span>
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 rounded-full" />
        </div>
      </div>

      <div className="p-10 grow flex flex-col gap-5">
        {/* Filters Section (Moved above the table) */}
        <section
          className="bg-slate-200 border border-black p-2 w-full max-w-sm mx-auto"
          aria-labelledby="filters-header"
        >
          <h2 id="filters-header" className="font-bold mb-1 text-sm">
            Filters:
          </h2>

          {/* Status Dropdown */}
          <label className="block mb-1 text-xs">
            Status:
            <select
              value={filters}
              onChange={handleFilterChange}
              className="mt-1 block w-full p-1 bg-white border border-gray-300 rounded-sm text-xs shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 transition duration-200 ease-in-out"
            >
              <option value="">All</option>
              <option value="Completed">Completed</option>
              <option value="InProgress">In Progress</option>
              <option value="Pending">Pending</option>
            </select>
          </label>

          {/* Year Dropdown */}
          <label className="block mb-1 text-xs">
            Year:
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="mt-1 block w-full p-1 bg-white border border-gray-300 rounded-sm text-xs shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 transition duration-200 ease-in-out"
            >
              {yearRange.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          {/* Month Dropdown */}
          <label className="block mb-1 text-xs">
            Month:
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="mt-1 block w-full p-1 bg-white border border-gray-300 rounded-sm text-xs shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 transition duration-200 ease-in-out"
            >
              {monthRange.map((month) => (
                <option key={month} value={month}>
                  {new Date(0, month - 1).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </label>
        </section>


 
        <table className="w-full h-fit bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr>
              {headers.map((header, index) => {
                const columnColor = index % 2 === 0 ? "bg-blue-200" : "bg-green-200";
                return (
                  <th
                    key={header}
                    className={`table-header p-2 border ${columnColor} text-black`}
                  >
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => {
              const { description, status, createddate, requestType, title, id } =
                request;

              const fields = [
                title,
                description,
                requestType === "NewRequest" ? "New request" : "Service",
                <button
                  key={id}
                  disabled={status === requestStatus.completed}
                  onClick={() => toggleModal(request)}
                  className={`inline-block px-2 py-1 rounded-full text-white ${request.reportId
                      ? "bg-gray-400"
                      : status === requestStatus.completed
                        ? "bg-green-500"
                        : status === requestStatus.inProgress
                          ? "bg-blue-400"
                          : "bg-yellow-400"
                    }`}
                >
                  {status}
                </button>,
                new Date(createddate).toLocaleDateString(),
              ];

              return (
                <tr
                  key={request.id}
                  className="text-center border-gray-300 odd:bg-gray-100 even:bg-white"
                >
                  {fields.map((field, index) => (
                    <td key={index} className="p-2 border px-6 py-4 whitespace-nowrap border-r border-gray-300">{field}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TechnicianTasks;