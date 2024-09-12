import React, { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import logo from "../../../public/dern-logo.png";
import NotificationComponent from "../NotificationComponent";
import LogoutButton from "../LogoutButton";

export default function Header(props) {
  const [open, setOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate

  const logout = () => {
  };

  const links = [
    { id: 1, title: "Home", url: "/" },
    { id: 3, title: "Articles", url: "/articles" },
    { id: 4, title: "Services", url: "/services" },
  ];

  if (user) {
    links.push(
      { id: 5, title: "View All Requests", url: "/allRequests" },
      { id: 6, title: "New Request", url: "/newRequest" }
    );
  }
  const handleUserTypeClick = (userType) => {
    navigate(`/login?userType=${userType}`);
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <header className="p-0">
      {/* Desktop and larger screens */}
      <nav className="hidden lg:flex items-center justify-between py-2 bg-indigo-500 fixed top-0 z-50 w-full shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-3 sm:gap-10 text-white ml-5 text-2xl">
          <Link to="/">
            Dern-Support
            {/* <img src={logo} alt="Dern Support Logo" className="h-14 lg:h-16" /> */}
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex justify-center">
          <ul className="flex gap-5 text-lg font-robotoSlab">
            {links.map((link) => (
              <li
                key={link.id}
                className={`text-gray-50 pt-2 cursor-pointer hover:text-sky-500 ${
                  location.pathname === link.url ? "text-sky-500" : ""
                }`}
              >
                <Link to={link.url}>{link.title}</Link>
              </li>
            ))}
            {user && (
              <li>
                <NotificationComponent />
              </li>
            )}
          </ul>
        </div>

        {/* Logout Button */}
        {user ? (
          <LogoutButton onClick={() => setOpen(false)}/>
        ) : (
          <div className="flex items-center gap-3 relative">
            {/* Dropdown Button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="mr-5 bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
              aria-label="Login options"
            >
              Login
            </button>

            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white text-gray-800 border border-gray-300 rounded shadow-lg w-48">
                <ul className="flex flex-col">
                  <li>
                    <button
                      onClick={() => handleUserTypeClick("customers")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Customer
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleUserTypeClick("admin")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Admin
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleUserTypeClick("technician")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Technician
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Mobile Header Bar */}
      <nav className="lg:hidden flex items-center justify-between py-4 bg-customLight fixed top-0 z-50 w-full shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-3 sm:gap-10 -ml-2">
          <Link to="/">
            <img src={logo} alt="Dern Support Logo" className="h-12 lg:h-14" />
          </Link>
        </div>

        {/* Burger Menu Button */}
        <button
          className="text-4xl text-white mr-4"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <MdClose /> : <MdMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <nav
        className={`lg:hidden  text-white fixed z-40 w-full bg-customLight transition-transform duration-300 ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Mobile Menu Links */}
        <ul className="flex flex-col gap-4 pt-24 pb-6 text-center font-robotoSlab">
          {links.map((link) => (
            <li
              key={link.id}
              className={`hover:text-sky-600 border-b-2 pb-2 border-sky-800 ${
                location.pathname === link.url ? "text-sky-500" : ""
              }`}
            >
              <Link
                to={link.url}
                className="text-main  focus:border-b-2 duration-150"
                onClick={() => setOpen(false)}
              >
                {link.title}
              </Link>
            </li>
          ))}
          <li className="flex justify-center">
            {user ? (
              <LogoutButton onClick={() => setOpen(false)}/> ) : (
              <div className="relative">
                {/* Dropdown Button */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-white-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
                  aria-label="Login options"
                >
                  Login
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white text-gray-800 border border-gray-300 rounded shadow-lg w-48">
                    <ul className="flex flex-col">
                      <li>
                        <button
                          onClick={() => handleUserTypeClick("customers")}
                          className="w-full text-left px-4 py-2 hover:bg-gray-200"
                        >
                          Customer
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleUserTypeClick("admin")}
                          className="w-full text-left px-4 py-2 hover:bg-gray-200"
                        >
                          Admin
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleUserTypeClick("technician")}
                          className="w-full text-left px-4 py-2 hover:bg-gray-200"
                        >
                          Technician
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
