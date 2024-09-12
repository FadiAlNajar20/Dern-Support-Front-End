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
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Issue Title</label>
        <input
          type="text"
          value={Title}
          onChange={(e) => setIssueTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Issue Description</label>
        <textarea
          value={Description}
          onChange={(e) => setIssueDescription(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Issue Type</label>
        <select
          value={Category}
          onChange={(e) => setIssueType(e.target.value)}
          required
          className="custom-select"
        >
          <option value="">Select issue type</option>
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
        </select>
      </div>

    
      {flag !== "admin" && (
        <div className="form-group">
          <label>Device Delivery Method</label>
          <select
            value={DeviceDeliveryMethod}
            onChange={(e) => setDeviceDeliveryMethod(e.target.value)}
            required
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
            <label>Actual Cost</label>
            <input
              type="number"
              value={actualCost}
              onChange={(e) => setActualCost(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Maintenance Time (Hours)</label>
            <input
              type="number"
              value={maintenanceTime}
              onChange={(e) => setMaintenanceTime(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Is Common Issue?</label>
            <input
              type="checkbox"
              checked={isCommon}
              onChange={(e) => setIsCommon(e.target.checked)}
            />
          </div>
        </>
      )}

      <div className="form-group">
        <label>Upload Image</label>
        <label htmlFor="file-upload" className="upload-btn text-white">
          Choose File
        </label>
        <input id="file-upload" type="file" onChange={handleImageChange} />
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Selected" className="uploadImg" />
            <p>
              File selected: {image.name}
              <button
                type="button"
                onClick={handleRemoveImage}
                className="remove-btn"
              >
                X
              </button>
            </p>
          </div>
        )}
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}

export default RequestForm;
