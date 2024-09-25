import React, { useState } from "react";
import { Link } from "react-router-dom";
import image1 from "../../assets/banner/3.jpg";
import image2 from "../../assets/banner/7.jpeg";
import image3 from "../../assets/banner/4.webp";

export default function Articles() {

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
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
           Latest Articles
          </h2>
          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            Check out our latest articles!
          </p>
        </div>
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
                    className="font-semibold text-[#1d4ed8] transition duration-100 hover:text-rose-600 active:text-rose-700">
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


