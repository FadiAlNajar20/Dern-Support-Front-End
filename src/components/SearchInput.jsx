import React from "react";

function SearchInput({ searchTerm, setSearchTerm, onSearch,placeholder }) {
  return (
    <div className="flex items-center justify-center ">
      <div className="flex items-center max-w-md mx-auto rounded-lg bg-gray-200 shadow-lg">
        <div className="w-full ">
          <input
            type="search"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-1 text-gray-800 bg-gray-200 rounded-full focus:outline-none"
          />
        </div>
        <div>
          <button
            type="button"
            className={`flex items-center justify-center w-12 h-12 text-white rounded-r-lg ${
              searchTerm.length > 0
                ? "bg-purple-500 shadow-md hover:shadow-lg"
                : "bg-gray-500 cursor-not-allowed shadow-md"
            }`}
            disabled={searchTerm.length === 0}
            onClick={onSearch}
          >
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchInput;