import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddArticle } from "../../hooks/adminDashboard";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";

export default function CreateNewArticle() {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const {
    mutate: addArticle,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useAddArticle();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Can not render this page",
      text: "Please refresh your page.",
    });
    return;
  }

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !image || !description) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please fill in all the fields.",
      });
      return;
    }

    const obj = {
      title: title,
      image: image,
      description: description,
    };

    try {
      await addArticle(obj);
      Swal.fire({
        icon: "success",
        title: "Article Created!",
        text: `The article has been created successfully.`,
      });
      navigate("/dashbord/create-new-article"); // Replace with actual redirect path
    } catch (err) {
      if (isError) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: `Failed to create the article. Please try again.`,
        });
        return;
      }
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 py-10">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-20">
        <div className="relative inline-block">
          <span className="text-2xl md:text-4xl font-bold">
          Create New Article 
          </span>
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 rounded-full" />
        </div>
      </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label
              htmlFor="Title"
              className="text-xl font-medium text-gray-900 block mb-2"
            >
              Article Title
            </label>
            <input
              type="text"
              id="Title"
              name="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg text-gray-800"
              placeholder="Enter the article title"
            />
          </div>
          <div className="mb-8">
            <label
              className="text-xl font-medium text-gray-900 block mb-2"
            >
              Article Description
            </label>
            <textarea
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg text-gray-800"
              placeholder="Enter the article description"
            />
          </div>
          <div className="mb-8">
            <label
              className="block mb-2 text-xl font-medium text-gray-900"
            >
              Article Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="Image"
                className="flex flex-col items-center justify-center w-full h-48 p-6 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="mt-2 text-lg font-medium text-gray-600">
                  Upload an image
                </span>
                <input
                  id="Image"
                  name="Image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:bg-blue-700"
            >
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
