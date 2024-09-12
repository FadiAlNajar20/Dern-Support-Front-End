import React, { useEffect } from "react";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";

function SuccessModal({ onClose, flag }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]); 

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4">
        <div className="text-green-500">
          {flag === "delete" ? (
            <FaTrashAlt className="text-red-500 text-xl" />
          ) : (
            <FaCheckCircle className="success-icon text-green-500 text-xl" />
          )}
        </div>
        {flag === "delete" ? (
          <p className="text-xl font-semibold text-red-600">Deletion Successful!</p>
        ) : (
          <p className="text-xl font-semibold text-green-600">Edition Successful!</p>
        )}
      </div>
    </div>
  );
}

export default SuccessModal;


