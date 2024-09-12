import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import Field from "../components/Field";
import { InputTypes } from "../utils/Constants";
import { setRef } from "@mui/material";

export default function Register() {
  const registerReference = useRef(null); // Reference to the form element
  const { registerUser } = useAuth(); // Use registerUser function from AuthContext
  const [isIndividual, setIsIndividual] = useState(true); // State to determine user type

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gather form data
    const formData = new FormData(registerReference.current);
    const data = Object.fromEntries(formData);

    // Add userType to the data based on selection
    data.userType = isIndividual ? "individual" : "company";

    try {
      // Call the registerUser function to handle registration
      await registerUser(data);

      registerReference.current.reset();
    } catch (error) {
      // Log any errors encountered during registration
      console.error("Error during registration:", error);
    }
  };

  // Effect to log user type selection changes
  useEffect(() => {
    console.log(isIndividual);
  }, [isIndividual]);

  // Handle changes in user type selection
  const handleUserTypeChange = (event) => {
    const value = event.target.value;
    setIsIndividual(value === "individual");
  };

  return (
    <section
      id="signup"
      className="min-h-screen flex items-center justify-center mt-28 mb-28"
    >
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="pt-8 text-4xl font-bold text-center text-gray-800 mb-8">
          Register
        </h1>

        <form
          className="flex flex-col gap-6 space-y-6 w-full max-w-lg mx-auto"
          onSubmit={handleSubmit}
          ref={registerReference}
        >
          {/* Radio buttons for selecting account type */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-base md:text-lg font-semibold text-gray-700 mb-4 md:mb-0">
              Account Type
            </p>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="AccountType"
                  value="individual"
                  onChange={handleUserTypeChange}
                  defaultChecked
                  className="h-4 w-4 md:h-5 md:w-5 text-red-600"
                />
                Individual
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="AccountType"
                  value="company"
                  onChange={handleUserTypeChange}
                  className="h-4 w-4 md:h-5 md:w-5 text-red-600"
                />
                Company
              </label>
            </div>
          </div>

          {/* Form fields in two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 -mb-6">
            {/* Dynamic input field based on account type */}
            <Field
              label={isIndividual ? "Name:" : "Company Name:"}
              type={InputTypes.TEXT}
              name="Name"
              placeholder={
                isIndividual ? "Enter your name" : "Enter the company name"
              }
            />

            {/* Static input fields for email, phone number, and passwords */}
            <Field label="Email:" type={InputTypes.EMAIL} name="Email" />
            <Field
              label="Phone Number:"
              type={InputTypes.PHONE}
              name="PhoneNumber"
            />
            <Field
              label="Password:"
              type={InputTypes.PASSWORD}
              name="Password"
            />
            <Field
              label="Confirm Password:"
              name="ConfirmPassword"
              placeholder={" "}
              type={InputTypes.PASSWORD}
            />
          </div>

          {/* Submit button */}
          <div className="w-full flex justify-center mt-6">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Link to the login page */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-800 hover:text-blue-500 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
