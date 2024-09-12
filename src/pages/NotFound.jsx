import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-600 text-white font-roboto">
      <h1
        className="text-[15em] not-found-title font-thin text-center text-gray-300 text-shadow-lg"
      >
        404
      </h1>
      <p className="text-2xl text-center font-thin">
        Oops! Something is wrong.
      </p>
      <Link
        to={'/'}
        className="mt-6 inline-block px-4 py-2 border border-gray-200 text-white text-xl font-light rounded transition duration-300 ease-in-out hover:bg-blue-700"
      >
         Go back to the initial page, it's better.
      </Link>
    </div>
  );
};

export default NotFound;
