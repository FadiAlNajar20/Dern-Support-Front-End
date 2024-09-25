import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Loading from "../../components/Loading";
import { requestStatus } from '../../utils/Constants';

export default function AdminViewByID() {
  const [isEditing, setIsEditing] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || {});
  console.log(user);

  if (!user) {
    navigate("/support-requests/getAll");
    return <Loading />;
  }

  const handleAddToService = () => {
    const newService = {
      id: user.customerid,
      title: user.title,
      description: user.issuedescription,
      cost: user.actualcost,
      image: user.image,
      date: user.createddate,
    };
    console.log(user);
    
    navigate("/AddNewService", { state: { service: newService } });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  return (
    <>
      <div className="p-10 h-full w-full flex gap-5">
        <div className="h-full w-9/12 mx-auto p-0 bg-white rounded-lg">
          <div className="flex items-center justify-center mb-20">
            <div className="relative inline-block">
              <span className="text-2xl md:text-4xl font-bold">
                Request details
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 rounded-full" />
            </div>
          </div>
          <div className="mt-8">
            <div className="flex flex-col mt-8">
              <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="inline-block min-w-full overflow-hidden align-middle">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-indigo-500 text-white">
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left uppercase">
                          Name
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left uppercase">
                          Status
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left uppercase">
                          Maintenance Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="bg-indigo-50 text-white">
                        <td className="px-6 py-4 border-b whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium leading-5 text-black">
                                {user?.name}
                              </div>
                              <div className="text-sm leading-5 text-gray-500">
                                {user?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 text-xs font-semibold leading-5 text-white rounded-full
                                ${user?.status === requestStatus.completed
                                ? "bg-green-500"
                                : user?.status === requestStatus.inProgress
                                  ? "bg-blue-400"
                                  : "bg-yellow-400"
                              }
                                                    `}
                          >
                            {user?.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap text-center">
                          {user?.maintenancetime ? `${user?.maintenancetime} Hours` : "-"}
                        </td>
                        <td>
                          {user?.status === requestStatus.completed && (
                            <button
                              onClick={handleAddToService}
                              className="mt-1 px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                            >
                              Add To Service
                            </button>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="lg:max-w-full lg:flex mx-auto h-full w-4/5 my-10 p-4 bg-white shadow-lg rounded-lg transform transition duration-500 hover:scale-105">
              <div className="lg:w-1/3">
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}/image/${user.image}`}
                  alt={user.title}
                  className="h-48 w-full object-cover rounded-lg lg:h-auto lg:rounded-none"
                />
              </div>
              <div className="flex flex-col justify-between p-6 leading-normal bg-white lg:w-2/3 border-t lg:border-t-0 lg:border-l border-gray-200 rounded-b lg:rounded-r-lg">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{user.title}</h2>
                  <p className="text-base text-gray-700">
                    {user.issuedescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
