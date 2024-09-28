import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  useUpdateArticle,
  useGetAllArticles,
  useDeleteArticle,
} from "../../hooks/adminDashboard";

export default function DashbordArticlesID() {
  const location = useLocation();
  const navigate = useNavigate();
  const info = location.state?.article;
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(info?.description);
  const { refetch } = useGetAllArticles();
  const updateArticleMutation = useUpdateArticle();
  const deleteArticleMutation = useDeleteArticle();
  console.log(description);

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        const updatedArticle = {
          id: info?.id,
          title: info?.title,
          description,
          image: info?.image,
        };

        await updateArticleMutation?.mutateAsync(updatedArticle);

        Swal.fire("Success!", "Your article has been updated.", "success");

        refetch();
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was an issue updating your article.",
          "error"
        );
        return;
      }
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });
    refetch();

    if (result.isConfirmed) {
      try {
        deleteArticleMutation?.mutateAsync(info?.id);
        Swal.fire("Deleted!", "Your article has been deleted.", "success");
        refetch();
        navigate("/dashbord/article");
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was an issue deleting your article.",
          "error"
        );
        return;
      }
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center items-center w-full mt-5 mb-10">

          <form className="w-9/12">
            <div className="flex items-center justify-center mb-20">
              <div className="relative inline-block">
                <span className="text-2xl md:text-4xl font-bold">
                  Edite Or Remove Artilce
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 rounded-full" />
              </div>
            </div>
            


            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Article Image
              </label>
              {info?.image && (
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}/image/${info?.image
                    }`}
                  alt="Article"
                  className="w-1/2 h-96 rounded-lg p-0"
                />
              )}
            </div>
            <div className="text-3xl font-bold mb-4 text-left">
              <h1>{info?.title}</h1>
            </div>
            <div className="w-full mb-4 border border-gray-200 rounded-lg ">
              <div className="px-4 py-2 bg-white rounded-b-lg">
                <label htmlFor="editor" className="sr-only">
                  Article
                </label>
                <textarea
                  id="editor"
                  className="block p-2.5 w-full h-72 text-sm text-gray-900 rounded-lg border border-gray-300 overflow-y-auto"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="flex">
              <button
                type="button"
                onClick={handleEditToggle}
                className={`inline-flex items-center px-5 py-2.5 mr-2 text-sm
                  font-medium text-center text-white ${!isEditing
                    ? 'bg-yellow-500 rounded-lg focus:ring-4 focus:ring-yellow-200 dark:focus:ring-yellow-900 hover:bg-yellow-600'
                    : 'bg-blue-500'
                  }`}
              >

                {isEditing ? "Save" : "Edit"}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="25">
                  <path
                    fill="#FFf"
                    d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
