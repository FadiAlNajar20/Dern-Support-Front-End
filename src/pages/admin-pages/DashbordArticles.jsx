import React, { useState } from "react";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { useGetAllArticles } from "../../hooks/adminDashboard";

export default function DashbordArticles(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const { data, isLoading, error } = useGetAllArticles();
  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  if (!data || data?.length === 0) {
    return <div>No articles found.</div>;
  }

  const totalPages = Math?.ceil(data?.length / itemsPerPage);

  const currentItems = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="flex justify-center mb-8 p-0">
        <div className="w-full lg:w-9/12 mx-auto p-5 bg-white rounded-lg shadow-lg ">
          <div className="flex items-center justify-center mb-20">
            <div className="relative inline-block">
              <span className="text-2xl md:text-4xl font-bold">
                All Article
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 rounded-full" />
            </div>
          </div>
          <div className="grid gap-8">
            {currentItems?.map((article) => (
              <div
                key={article?.id}
                className="grid grid-cols-1 lg:grid-cols-4 gap-5 p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className="lg:col-span-1 h-48 overflow-hidden rounded-lg"
                  title="Image"
                >
                  <img
                    src={`${import.meta.env.VITE_SERVER_URL}/image/${article?.image
                      }`}
                    alt={article?.title}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <div className="lg:col-span-3 flex flex-col justify-between">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {article?.title}
                    </h2>
                    <p className="text-gray-700 line-clamp-3">
                      {article?.description}
                    </p>
                  </div>
                  <div className="flex justify-end">
                      <Link
                        to={props.flag == "customer" ?`/articles/${article?.id}`:`/dashbord/article/${article?.id}`}
                        state={{ article: article }}
                        className="bg-indigo-500 text-white inline-block text-neutralLight  hover:bg-secondary bg-primary py-2 px-4 rounded-md transition-colors duration-300"
                      >
                        Read More
                      </Link>
                    </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
