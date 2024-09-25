import React, { useState } from "react";

function ServiceModal({ service, onClose, onSubmit }) {
  const [title, setTitle] = useState(service.title);
  const [category, setCategory] = useState(service.category);
  const [actualcost, setActualCost] = useState(service.actualcost);
  const [maintenancetime, setTimeMinutes] = useState(service.maintenancetime);
  const [issuedescription, setIssueDescription] = useState(service.issuedescription);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...service,
      title,
      category,
      actualcost,
      maintenancetime,
      issuedescription,
    });
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[700px] relative">
          <h2 className="text-2xl font-bold mb-4 text-center">Edit Service</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="software">Software</option>
                <option value="hardware">Hardware</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Actual Cost</label>
              <input
                type="number"
                value={actualcost}
                onChange={(e) => setActualCost(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Time (Minutes)</label>
              <input
                type="number"
                value={maintenancetime}
                onChange={(e) => setTimeMinutes(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Issue Description</label>
              <textarea
                value={issuedescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-600"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-900 px-4 py-2 text-white hover:bg-indigo-100 "
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ServiceModal;

