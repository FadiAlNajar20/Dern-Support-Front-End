import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { useAddArticle } from "../hooks/adminDashboard";


export default function CreateNewArticle() {
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();
    const { user } = useAuth();
    const { mutate: addArticle, isLoading, isError, isSuccess, error } = useAddArticle();


    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const obj = {
            title : title,
            image : image,
            description: description
        }
        // console.log("Object to send:", obj.Image);
        
            
            try {
                await addArticle(obj);
                // Redirect or update UI on success
                navigate("/dashbord/create-new-article"); // Replace with actual redirect path
            } catch (err) {
                // Error handling
                console.log("Error publishing article:", err);
            }
    };

    return (
        <>
            <div className="flex">
                <Sidebar />

                <div className="flex flex-col space-y-12 w-full max-w-3xl mx-auto mt-12">
                    <div className="flex flex-col border rounded-lg overflow-hidden bg-white">
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-8">
                                    <label htmlFor="Title" className="text-2xl block mb-2 font-medium text-gray-900 dark:text-black">
                                        Article Title
                                    </label>
                                    <input
                                        type="text"
                                        id="Title"
                                        name="Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        aria-describedby="helper-text-explanation"
                                        className=" border border-gray-300 text-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write title here.."
                                    />

                                </div>
                                <div className="mb-8">
                                    <label className="text-2xl block mb-2 font-medium text-gray-900 dark:text-black"> Article Description</label>
                                    <textarea
                                        value={description}
                                        name="description"
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="block p-2.5 w-full h-72 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write your Article here..."
                                        required
                                    />
                                </div>
                                <div className="mb-8">
                                    <div className="w-full px-3 mb-8">
                                        <label className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center"
                                            htmlFor="Image">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>

                                            <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">Category image</h2>

                                            <p className="mt-2 text-gray-500 tracking-wide">Upload or drag & drop your file SVG, PNG, JPG or GIF. </p>
                                            <label className="text-2xl block mb-2 font-medium text-gray-900 dark:text-black">Article Image</label>
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

                                <div className="flex justify-start">

                                    <button
                                        type="submit"
                                        className="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500"
                                    >
                                        Publish
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <p>{modalMessage}</p>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
