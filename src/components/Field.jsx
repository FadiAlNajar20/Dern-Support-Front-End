import React, { useState } from "react";

const Field = ({ label, type, name, placeholder }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-col  w-full relative">
      {/* Label */}
      <label className="text-sm font-medium text-gray-700 mb-2">{label}</label>

      {/* Input Container */}
      <div className="relative">
        <input
          type={type === "password" && isPasswordVisible ? "text" : type}
          placeholder={placeholder || `Enter your ${name}`}
          name={name}
          required
          className="w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-150 ease-in-out"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={handleTogglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
          >
            {isPasswordVisible ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5.5C6.48 5.5 2 12 2 12s4.48 6.5 10 6.5 10-6.5 10-6.5S17.52 5.5 12 5.5zM12 15a3 3 0 110-6 3 3 0 010 6z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19c-7 0-9-7-9-7s2-7 9-7 9 7 9 7-2 7-9 7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15a3 3 0 01-3-3 3 3 0 013-3 3 3 0 013 3 3 3 0 01-3 3z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Field;
