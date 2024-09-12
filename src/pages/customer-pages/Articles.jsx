import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Loading from "../../components/Loading";
import DashbordArticles from "../admin-pages/DashbordArticles";
export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchArticles() {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_API_BASE_URL}/articles`
  //       );
  //       setArticles(response.data);
  //     } catch (error) {
  //       console.error("Error fetching Articles:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchArticles();
  // }, []);

  // if (loading) {
  //   return <Loading />;
  // }
  return (
    <div className="container mx-auto px-4 my-28">
     
      <DashbordArticles flag="customer"/>
      
    </div>
  );
}
