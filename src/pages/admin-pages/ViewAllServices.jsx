import React, { useState, useEffect } from "react";
import Modal from "../../components/modals/ServiceModal";
import SuccessModal from "../../components/modals/SuccessModal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDeleteService, useSeriveces, useUpdateService } from "../../hooks/useAdminServiceHook";
import Loading from "../../components/Loading";
import NotFound from "../NotFound";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

function ViewAllServices() {
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();
  const { data, isLoading, isError, refetch } = useSeriveces();
  const [services, setServices] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [editService, setEditService] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);

  useEffect(() => {
    if (data) {
      setServices(data);
      console.log(data);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <NotFound />;
  }

  const filteredServices = filterCategory
    ? data.filter((service) => service.category === filterCategory)
    : data;

    const handleDelete = (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteMutation.mutate(id, {
            onSuccess: () => {
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'The service has been deleted.',
                timer: 3000,
                showConfirmButton: false,
              });
              refetch(); // Refetch services data after successful deletion
            },
            onError: () => {
              Swal.fire({
                icon: 'error',
                title: 'Delete Failed',
                text: 'There was a problem deleting the service.',
              });
            }
          });
        }
      });
    };
    

  const handleEdit = (service) => {
    setEditService(service);
  };

  const handleUpdateService = (updatedService) => {
    updateMutation.mutate(updatedService, {
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Service Updated',
          text: 'The service has been updated successfully!',
          timer: 3000, // Auto close after 3 seconds
          showConfirmButton: false,
        });
        refetch(); // Refetch services data after successful update
        setEditService(null);
      },
      onError: () => {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'There was a problem updating the service.',
        });
      }
    });
  };
  
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-center mb-20">
            <div className="relative inline-block">
              <span className="text-2xl md:text-4xl font-bold">
                View All Services
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 rounded-full" />
            </div>
          </div>
          {/* Filter by Category */}
          <div className="mb-4 flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-2 border border-gray-300 bg-indigo-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Categories</option>
              <option value="software">Software</option>
              <option value="hardware">Hardware</option>
            </select>
          </div>

          {/* Table of Services */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-indigo-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-lg font-semibold border-r border-gray-300">ID</th>
                  <th className="px-6 py-3 text-left text-lg font-semibold border-r border-gray-300">Title</th>
                  <th className="px-6 py-3 text-left text-lg font-semibold border-r border-gray-300">Category</th>
                  <th className="px-6 py-3 text-left text-lg font-semibold border-r border-gray-300">Actual Cost</th>
                  <th className="px-6 py-3 text-left text-lg font-semibold border-r border-gray-300">Time (Minutes)</th>
                  <th className="px-6 py-3 text-left text-lg font-semibold border-r border-gray-300">Description</th>
                  <th className="px-6 py-3 text-left text-lg font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50 transition-all duration-200">
                    <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">{service.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300 text-blue-600 underline font-bold">
                      <Link to={`/servicesInAdmin/${service.id}`} state={{ readMore: service, to: "/admin/ViewAllServices" }}>
                        {service.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">{service.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">{service.actualcost}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">{service.maintenancetime} -days</td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">{service.issuedescription}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
                        onClick={() => handleEdit(service)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={() => handleDelete(service.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
      {/* Edit Service Modal */}
      {editService && (
        <Modal
          service={editService}
          onClose={() => setEditService(null)}
          onSubmit={handleUpdateService}
        />
      )}

      {/* Success Message Modal */}
      {successMessage && (
        <SuccessModal
          message="Service updated successfully!"
          onClose={() => setSuccessMessage(false)}
        />
      )}

      {/* Delete Message Modal */}
      {deleteMessage && (
        <SuccessModal
          message="Service deleted successfully!"
          onClose={() => setDeleteMessage(false)}
        />
      )}
    </>
  );
}

export default ViewAllServices;
