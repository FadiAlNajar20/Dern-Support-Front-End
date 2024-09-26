import React, { useState } from "react";
import "../CSS/requestForm.css";

function RequestForm({ onSubmit, loading, flag }) {
  const [Title, setIssueTitle] = useState("");
  const [Description, setIssueDescription] = useState("");
  const [Category, setIssueType] = useState("");
  const [DeviceDeliveryMethod, setDeviceDeliveryMethod] = useState(""); 
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  

  const [actualCost, setActualCost] = useState("");
  const [maintenanceTime, setMaintenanceTime] = useState("");
  const [isCommon, setIsCommon] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
  
    const formData = { 
      Title, 
      Description, 
      Category, 
      DeviceDeliveryMethod, 
      image,
      actualCost: flag === "admin" ? actualCost : undefined,
      maintenanceTime: flag === "admin" ? maintenanceTime : undefined,
      isCommon: flag === "admin" ? isCommon : undefined,
    };

    onSubmit(formData);

    setImagePreview(null);
    setImage(null);
    setIssueDescription("");
    setIssueTitle("");
    setIssueType("");
    setDeviceDeliveryMethod("");
    setActualCost("");
    setMaintenanceTime("");
    setIsCommon(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
    <div className="form-group">
      <label className="block text-gray-700">Issue Title</label>
      <input
        type="text"
        value={Title}
        onChange={(e) => setIssueTitle(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  
    <div className="form-group">
      <label className="block text-gray-700">Issue Description</label>
      <textarea
        value={Description}
        onChange={(e) => setIssueDescription(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  
    <div className="form-group">
      <label className="block text-gray-700">Issue Type</label>
      <select
        value={Category}
        onChange={(e) => setIssueType(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select issue type</option>
        <option value="Hardware">Hardware</option>
        <option value="Software">Software</option>
      </select>
    </div>
  
    {flag !== "admin" && (
      <div className="form-group">
        <label className="block text-gray-700">Device Delivery Method</label>
        <select
          value={DeviceDeliveryMethod}
          onChange={(e) => setDeviceDeliveryMethod(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select delivery method</option>
          <option value="pickup">On Site</option>
          <option value="company">Delivery</option>
        </select>
      </div>
    )}
  
    {flag === "admin" && (
      <>
        <div className="form-group">
          <label className="block text-gray-700">Actual Cost</label>
          <input
            type="number"
            value={actualCost}
            onChange={(e) => setActualCost(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
  
        <div className="form-group">
          <label className="block text-gray-700">Maintenance Time (Hours)</label>
          <input
            type="number"
            value={maintenanceTime}
            onChange={(e) => setMaintenanceTime(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
  
        <div className="form-group">
          <label className="block text-gray-700">Is Common Issue?</label>
          <input
            type="checkbox"
            checked={isCommon}
            onChange={(e) => setIsCommon(e.target.checked)}
            className="mr-2"
          />
          <span>Yes</span>
        </div>
      </>
    )}
  
    <div className="form-group">
      <label className="block text-gray-700">Upload Image</label>
      <label
        htmlFor="file-upload"
        className="upload-btn text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md cursor-pointer inline-block"
      >
        Choose File
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleImageChange}
        className="hidden"
      />
      {imagePreview && (
        <div className="image-preview mt-2">
          <img src={imagePreview} alt="Selected" className="uploadImg w-32 h-32 object-cover" />
          <p className="mt-2">
            File selected: {image.name}
            <button
              type="button"
              onClick={handleRemoveImage}
              className="ml-2 bg-red-600 text-white py-1 px-2 rounded-md"
            >
              X
            </button>
          </p>
        </div>
      )}
    </div>
  
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50"
    >
      {loading ? "Submitting..." : "Submit Request"}
    </button>
  </form>
  
  );
}

export default RequestForm;
