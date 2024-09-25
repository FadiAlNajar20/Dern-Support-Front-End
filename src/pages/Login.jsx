import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import Field from "../components/Field";
import { InputTypes } from "../utils/Constants";

export default function Login() {
  const loginReference = useRef(null);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [userType, setUserType] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('userType');
    if (type) {
      setUserType(type);
      console.log(type);
    }
  }, [location.search]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(loginReference.current);
    const data = Object.fromEntries(formData);
    data.userType = userType;

    console.log(userType); // Debugging

    try {
      const response = await loginUser(data);
      console.log(response); // Debugging

      if (response.data.success) {
        localStorage.setItem("Email", data.Email);
        loginReference.current.reset();
        if (data.userType === "coustomers") {
          navigate("/services");
        }
        else if (data.userType === "admin") {
          navigate("/support-requests/getAll");
        }
        else if (data.userType == "technician") {
          navigate("/technicainTasks");
        }
        else {
          navigate("/");
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <section
      id="signup"
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="pt-8 text-4xl text-customBlueDarker font-semibold text-center mb-6">
          Login
        </h1>

        <form
          className="space-y-6 w-full max-w-lg mx-auto"
          onSubmit={handleSubmit}
          ref={loginReference}
        >
          <Field label="Email:" type={InputTypes.EMAIL} name="Email" />
          <Field label="Password:" type={InputTypes.PASSWORD} name="Password" />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 w-full rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-800 hover:text-blue-500 font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}
