import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from '../../components/Loading';
import { usesSpportRequestsGetAll } from "../../hooks/adminDashboard";
import { requestStatus } from '../../utils/Constants';

const AdminViewAllRequests = () => {
  const [filterRequest, setFilterRequest] = useState("all");

  const { data, isLoading, error } = usesSpportRequestsGetAll();
  const headers = ["Name", "Title", "Status", "Maintenance Time", "Actions"];

  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>There is an error</p>;
  }

  const filteredRequest = (filterRequest === "all"
    ? data
    : data?.filter((request) => request?.status === filterRequest)
  )?.filter((request) => request?.requesttype === "NewRequest");

  return (
    <>
      <div className="flex justify-center mx-auto">
        <div className="flex flex-col max-w-6xl w-full">
          <div className="flex items-center justify-center mb-12">
            <div className="relative inline-block">
              <span className="text-2xl md:text-4xl font-bold">
                All Request
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 rounded-full" />
            </div>
          </div>
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
          <div className="overflow-x-hidden mb-20"> {/* إلغاء السكرولينغ */}
            <div className="inline-block min-w-full align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-indigo-700 text-white">
                  <tr>
                    {headers?.map((header, index) => (
                      <th
                        key={index}
                        className="table-header px-6 py-3 text-lg font-semibold leading-4 tracking-wider text-left border-b border-gray-300 uppercase border-r border-gray-300"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequest?.map((u) => (
                    <tr key={u?.id} className="hover:bg-gray-50 transition-all duration-200">
                      <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-bold text-gray-900">{u?.name}</div>
                            <div className="text-sm text-gray-500">{u?.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                        <div className="text-sm font-medium text-gray-900">{u?.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                        <span
                          className={`inline-flex items-center px-3 py-1 text-xs font-semibold text-white rounded-full
              ${u?.status === requestStatus.completed
                              ? "bg-green-500"
                              : u?.status === requestStatus.inProgress
                                ? "bg-blue-400"
                                : "bg-yellow-400"
                            }
            `}
                        >
                          {u?.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap text-center border-r border-gray-300">
                        {u?.maintenancetime ? `${u?.maintenancetime} Hours` : "-"}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <Link
                          to={`/support-requests/getAll/${u?.id}`}
                          state={{ user: u }}
                          className="text-indigo-600 hover:text-indigo-900 font-semibold"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminViewAllRequests;
