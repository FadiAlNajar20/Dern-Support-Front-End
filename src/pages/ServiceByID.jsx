import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { GiCheckMark } from "react-icons/gi";
import { useAuth } from "../contexts/auth";
import Loading from "../components/Loading";
import RatingStars from "../components/RatingStars";
import { useFeedbacksToGetRate } from "../hooks/feedbacksHooks";
import { useSendServiceRequest } from "../hooks/useNewRequestHook";

export default function ServiceByID() {
  const email = localStorage.getItem("Email");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const info = location.state?.readMore;
  const to = location.state?.to || "/services";
  const { data, isLoading, error } = useFeedbacksToGetRate(info?.id);
  const { mutate } = useSendServiceRequest();

  if (isLoading) {
    return <Loading />;
  }

  const request = () => {
    if (user) {
      const inputOptions = {
        onSite: "On site",
        delivery: "Delivery",
      };

      Swal.fire({
        title: "Thank you for choosing DernSupport",
        text: `We will contact you on: ${email}`,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        input: "select",
        inputOptions: inputOptions,
        inputPlaceholder: "Select an option",
        preConfirm: (selectedOption) => {
          mutate(
            {
              ServiceID: info?.id,
              Method: selectedOption,
            },
            {
              onSuccess: () => {
                Swal.fire(`You chose ${inputOptions[selectedOption]}`);
              },
              onError: (error) => {
                console.error("There was a problem with the operation:", error);
                Swal.fire("There was a problem");
              }
            }
          );
        },
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-16 p-10 bg-white rounded-3xl shadow-2xl">
      <div className="flex justify-start items-center mb-6">
        <Link
          to={to}
          className="flex items-center px-4 py-2 text-base font-semibold text-whitebg-indigo-500 rounded-lg shadow-md hover:from-red-700 hover:bg-indigo-500 transition duration-300"
        >
          <svg
            className="w-5 h-5 me-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Previous
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/2">
          <img
            className="w-full h-auto rounded-xl object-cover shadow-lg"
            src={`${import.meta.env.VITE_SERVER_URL}/image/${info?.image}`}
            alt="Support Services"
          />
        </div>

        <div className="lg:w-1/2 flex flex-col gap-8">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            We're Here to Help
          </h2>
          <p className="text-2xl text-gray-800 flex items-center">
            Price: 
            <span className="text-green-600 ml-3 font-bold">${info?.actualcost}</span>
          </p>

          <div className="text-2xl text-gray-800 flex items-center">
            Rating:
            <span className="ml-4">
              {data?.averageRating !== undefined && data !== error ? (
                <RatingStars rating={data?.averageRating} />
              ) : (
                <RatingStars rating={0} />
              )}
            </span>
          </div>

          <ul className="text-lg text-gray-700 space-y-4">
            <li className="flex items-center">
              <GiCheckMark className="text-green-600 mr-4" />
              Diagnose & troubleshoot issues
            </li>
            <li className="flex items-center">
              <GiCheckMark className="text-green-600 mr-4" />
              Additional onsite services may incur extra charges
            </li>
            <li className="flex items-center">
              <GiCheckMark className="text-green-600 mr-4" />
              Instant support available via DernSupport Now! online assistance
            </li>
          </ul>
          <button
            onClick={request}
            className="bg-indigo-500 text-white px-6 py-3 mt-8 rounded-full shadow-lg hover:from-red-600 hover:to-red-700 transition duration-300"
          >
            Add Request
          </button>
        </div>
      </div>
    </div>
  );
}