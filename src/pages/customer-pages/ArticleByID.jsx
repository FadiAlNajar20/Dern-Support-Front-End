import React from "react";
import { useParams } from "react-router-dom";
import { useGetArticleById } from "../../hooks/customerHooks";
import Loading from "../../components/Loading";

export default function ArticleByID() {
  const { id } = useParams();
  const { data: article, isLoading, error } = useGetArticleById(id);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="mx-auto px-4 my-28 text-center">
        <p className="text-lg text-red-500">Error fetching article details</p>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <>
          <img
            className="max-w-full mt-20 rounded-xl"
            src={`${import.meta.env.VITE_SERVER_URL}/image/${article[0].image}`}
            alt={article[0].title}
          />
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4">{article[0].title}</h2>
            <p className="text-gray-700 leading-loose">{article[0].description}</p>
          </div>
        </>
      </div>
    </div>
  );
}