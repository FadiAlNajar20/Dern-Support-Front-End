import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center ">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-sky-600"
        role="status"
      >
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
}
