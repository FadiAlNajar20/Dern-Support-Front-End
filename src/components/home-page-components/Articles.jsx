// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Button } from "@mui/material";
// import Seperator from "./Seperator";
// import image1 from "../../assets/banner/3.jpg";
// import image2 from "../../assets/banner/7.jpeg";
// import image3 from "../../assets/banner/4.webp";

// export default function Articles() {
//   const [articles, setArticles] = useState([]);

//   // useEffect(() => {
//   //   async function fetchArticles() {
//   //     try {
//   //       const response = await axios.get(
//   //         `${import.meta.env.VITE_API_BASE_URL}/articles/getAll`
//   //       );
//   //       if (response.data.length > 0) {
//   //         setArticles(response.data);
//   //       } else {
//   //         // Fallback to dummy data if API returns an empty array
//   //         setArticles(dummyArticles);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching Articles:", error);
//   //       // Fallback to dummy data if API call fails
//   //       setArticles(dummyArticles);
//   //     }
//   //   }
//   //   fetchArticles();
//   // }, []);

//   // Dummy data for fallback
//   const dummyArticles = [
//     {
//       _id: "1",
//       img: image1,
//       title: "Article One",
//       excerpt:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
//     },
//     {
//       _id: "2",
//       img: image2,
//       title: "Article Two",
//       excerpt:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
//     },
//     {
//       _id: "3",
//       img: image3,
//       title: "Article Three",
//       excerpt:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
//     },
//   ];

//   const latestArticles = articles.slice(-3).reverse();

//   return (
//     <div className="container mx-auto px-4 my-28">
//       {/* <h1 className="text-4xl font-bold text-center mb-12">
//         Latest
//         <span className="text-red-600 border-b-2 border-black"> Articles</span>
//       </h1> */}
//       <Seperator
//         heading="Latest Articles "
//         text="Stay updated with the latest news, tips, and insights from our experts in the field."
//       />
//       <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full">
//         {/* {latestArticles.map((article) => ( */}
//         {dummyArticles.map((article) => (
//           <div
//             key={article._id}
//             className="article-card max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transform transition duration-500 hover:shadow-2xl w-full"
//           >
//             <img
//               className=" w-full h-64 object-contain transform transition duration-500 hover:opacity-75 hover:cursor-pointer"
//               src={article.img}
//               alt={article.title}
//             />
//             <div className="px-6 py-4">
//               <div className="font-bold text-xl mb-2 text-left">
//                 {article.title}
//               </div>
//               <p className="text-gray-700 text-base mb-4 line-clamp-4">
//                 {article.excerpt}
//               </p>
//               <div className="flex justify-center">
//                 <Link
//                   to={`/articles/${article._id}`}
//                   className="border border-sky-500 text-sky-500 px-4 py-2 rounded hover:bg-sky-500 hover:text-white transition-colors duration-300"
//                 >
//                   Read More
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="text-center mt-12">
//         <Link
//           to="/articles"
//           className="inline-block bg-sky-500 text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-300 hover:bg-sky-700"
//         >
//           View More
//         </Link>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import image1 from "../../assets/banner/3.jpg";
import image2 from "../../assets/banner/7.jpeg";
import image3 from "../../assets/banner/4.webp";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  const dummyArticles = [
    {
      _id: "1",
      img: image1,
      title: "Article One",
      excerpt:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      date: "April 2, 2022",
    },
    {
      _id: "2",
      img: image2,
      title: "Article Two",
      excerpt:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      date: "April 3, 2022",
    },
    {
      _id: "3",
      img: image3,
      title: "Article Three",
      excerpt:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      date: "April 4, 2022",
    },
  ];

  return (
    <section className="py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        {/* Heading */}
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
           Latest Articles
          </h2>
          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            Check out our latest articles!
          </p>
        </div>
        {/* Articles */}
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
          {dummyArticles.map((article) => (
            <article
              key={article._id}
              className="flex flex-col items-center gap-4 md:flex-row lg:gap-6"
            >
              <Link
                to={`/articles/${article._id}`}
                className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
              >
                <img
                  src={article.img}
                  loading="lazy"
                  alt={article.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </Link>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-400">{article.date}</span>
                <h2 className="text-xl font-bold text-gray-800">
                  <Link
                    to={`/articles/${article._id}`}
                    className="transition duration-100 hover:text-rose-500 active:text-rose-600"
                  >
                    {article.title}
                  </Link>
                </h2>
                <p className="text-gray-500">{article.excerpt}</p>
                <div>
                  <Link
                    to={`/articles/${article._id}`}
                    className="font-semibold text-[#1d4ed8] transition duration-100 hover:text-rose-600 active:text-rose-700"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


