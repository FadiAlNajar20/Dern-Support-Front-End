import React, { useState } from "react";
import CustomTable from "../../components/CustomTable";
import {
  useSpares,
  useAddSpare,
  useDeleteSpare,
  useUpdateSpare,
} from "../../hooks/sparesHooks";
import Loading from "../../components/Loading";
import NotFound from "../NotFound";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          Coles
        </button>
        {children}
      </div>
    </div>
  );
};

const UpdateSpareForm = ({ spare, onSave }) => {
  const [formData, setFormData] = useState(
    spare || { name: "", quantity: 10, reorderthreshold: 10, price: 0 }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "name") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: parseInt(value, 10) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name == "") {
      alert("You can't create a spare without a name");
      return;
    }
    console.log("fromData: ", formData);
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center text-2xl font-bold">
       <h1>Edit Spare</h1>
      </div>
      <div>
        <label className="block text-sm font-medium">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Cost:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Reorder Threshold:</label>
        <input
          type="number"
          name="reorderthreshold"
          value={formData.reorderthreshold}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          min="10"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={formData.reorderthreshold < 10}
          min={formData.reorderthreshold}
        />
      </div>
      <div className="w-fit mx-auto">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded "
        >
          Save
        </button>
      </div>
    </form>
  );
};

const headers = ["Name", "Cost", "Quantity", "Reorder Threshold", "Actions"];

// RenderRow.displayName = "RenderRow";
const RenderRow = (handleDelete, handlePreUpdate) => {
  const Row = (spare) => (
    <>
      <td className="p-6 px-6 py-4 whitespace-nowrap border-r border-gray-300">{spare.name}</td>
      <td className="p-4 px-6 py-4 whitespace-nowrap border-r border-gray-300 text-center">${spare.price}</td>
      <td className="p-4 px-6 py-4 whitespace-nowrap border-r border-gray-300 text-center">{spare.quantity}</td>
      <td className="p-4 px-6 py-4 whitespace-nowrap border-r border-gray-300 text-center">{spare.reorderthreshold}</td>
      <td className="p-4 px-6 py-4 whitespace-nowrap border-r border-gray-300 text-center flex justify-around">
        <button onClick={() => handlePreUpdate(spare)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="25"
          >
            <path
              fill="#FFC100"
              d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
            />
          </svg>
        </button>
        <button onClick={() => handleDelete(spare.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width="25"
          >
            <path
              fill="#FF0000"
              d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"
            />
          </svg>
        </button>
      </td>
    </>
  );

  Row.displayName = "RenderRow";
  return Row;
};

const SparesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpare, setSelectedSpare] = useState(null);
  const { data, isLoading, error, isError } = useSpares();
  const addSpareMutation = useAddSpare();
  const deleteSpareMutation = useDeleteSpare();
  const updateSpareMutation = useUpdateSpare();

  const handleDelete = (id) => {
    deleteSpareMutation.mutate(id);
  };

  const handlePreUpdate = (spare) => {
    setSelectedSpare(spare);
    setIsModalOpen(true);
  };

  const handleUpdate = (spare) => {
    updateSpareMutation.mutate(spare);
    setIsModalOpen(false);
  };

  const handleModalClose = () => setIsModalOpen(false);

  const handleAddSpare = (spare) => {
    addSpareMutation.mutate(spare);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <h1 className="text-3xl mx-auto">
        {error.message || "An error occurred"}
      </h1>
    );
    // return <NotFound />;
  }
  return (
    <>

      <div className="flex items-center justify-center">
        <div className="relative inline-block">
          <span className="text-2xl md:text-4xl font-bold">
            Spare
          </span>
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 rounded-full" />
        </div>
      </div>
      <div className="p-10 h-full  w-full flex flex-col">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-500 text-white px-4 py-2 rounded w-fit"
        >
          Add New Spare
        </button>

        <CustomTable
          headers={headers}
          data={data}
          renderRow={RenderRow(handleDelete, handlePreUpdate)}
        />
        {isModalOpen && (
          <Modal onClose={handleModalClose}>
            <UpdateSpareForm
              spare={selectedSpare}
              onSave={selectedSpare == null ? handleAddSpare : handleUpdate}
            />
          </Modal>
        )}
      </div>
    </>
  );
};

export default SparesPage;
