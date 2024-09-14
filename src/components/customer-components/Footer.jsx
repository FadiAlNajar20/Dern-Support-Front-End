import React from "react";
import { Link } from "react-router-dom";
import { IoSend } from "react-icons/io5";
const quickLinks = [
  {
    path: "/about",
    display: "About",
  },
  {
    path: "#",
    display: "Privacy Policy",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/articles",
    display: "Articles",
  },
  {
    path: "/products",
    display: "Products",
  },
];

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="bg-indigo-500 text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          {/* Logo and Description */}
          <div className="w-full lg:w-1/3 md:w-1/2 sm:w-full mb-8 pr-5 text-center sm:text-left">
            <div className="flex justify-center sm:justify-start mb-4 flex items-center gap-3 sm:gap-10 text-white text-2xl" >
              <Link to="/home">
                Dern-Support
              </Link>
            </div>
            <p className="sm:text-left text-white">
              Dern Support: We are dedicated to providing exceptional support
              for both hardware and software needs. Our team ensures your
              systems operate smoothly and efficiently with top-notch repair and
              installation services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full lg:w-1/6 md:w-1/4 sm:w-1/2 mb-8 text-center sm:text-left">
            <h5 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h5>
            <ul>
              {quickLinks.map((item, index) => (
                <li key={index} className="mb-3 ">
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white text-white"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Head Office */}
          <div className="w-full lg:w-1/4 md:w-1/4 sm:w-1/2 mb-8 text-center sm:text-left">
            <h5 className="text-lg font-semibold text-white mb-4 ">
              Head Office
            </h5>
            <p className="text-white">Marg Al Hammam, Amman, Jordan</p>
            <p className="text-white">Phone: +96261234567</p>
            <p className="text-white">Email: Info@DernSupport.com</p>
            <p className="text-white">Company Time: 9am - 7pm</p>
          </div>

          {/* Newsletter */}
          <div className="w-full lg:w-1/4 md:w-1/2 sm:w-full mb-8 text-center sm:text-left">
            <h5 className="text-lg font-semibold text-white mb-4">
              Newsletter
            </h5>
            <p className="mb-4 text-white">Subscribe to our newsletter</p>
            <div className="flex justify-center sm:justify-start">
              <input
                type="email"
                placeholder="Email"
                className="w-full max-w-xs p-2 rounded-l-lg focus:outline-none"
              />
              <button className="bg-sky-500 text-white p-3 rounded-r-lg hover:bg-sky-600">
                <IoSend />
              </button>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="w-full text-center border-t border-gray-700 pt-4">
            <p className="flex items-center justify-center gap-1 text-gray-400">
              <i className="ri-copyright-line"></i>Copyright {year}, Developed
              by Team. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
