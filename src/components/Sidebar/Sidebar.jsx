import React, { useState, useEffect } from "react";
import "../../CSS/Sidebar.css";
import { Link } from "react-router-dom";
import LogoutButton from "../LogoutButton";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleLocationChange = () => {
      setActiveLink(window.location.href);
      console.log(activeLink);
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const handleExpandCollapse = () => {
    setIsCollapsed(!isCollapsed);
    console.log(isCollapsed);
  };

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  return (
    <nav className={`mt-0 sidebar bg-indigo-500 ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top-wrapper">
        <div className="sidebar-top">
          <Link to="/support-requests/getAll" className="logo__wrapper">
            <span className="hide company-name">Admin Dashbord</span>
          </Link>
        </div>
        <button
          className="expand-btn"
          type="button"
          onClick={handleExpandCollapse}
        >
        </button>
      </div>
      <div className="sidebar-links">
        <ul>
          <li>
            <Link
              to="/support-requests/getAll"
              title="Dashboard"
              className={`tooltip ${activeLink.includes("/support-requests/getAll") ? "active" : ""
                }`}
              onClick={() => handleLinkClick("/support-requests/getAll")}
            >
              <span className="link hide">View Request</span>
              <span className="tooltip__content">View Request</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/ViewAllServices"
              title="Dashboard"
              className={`tooltip ${activeLink.includes("/admin/ViewAllServices") ? "active" : ""
                }`}
              onClick={() => handleLinkClick("/admin/ViewAllServices")}
            >
              

              <span className="link hide">View Services</span>
              <span className="tooltip__content">View Services</span>
            </Link>
          </li>
          <li>
            <Link
              to="/spares"
              title="Market Overview"
              className={`tooltip ${activeLink.includes("/spares") ? "active" : ""
                }`}
              onClick={() => handleLinkClick("/spares")}
            >
             
              <span className="link hide">View Spare</span>
              <span className="tooltip__content">View Spare</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashbord/article"
              title="Article"
              className={`tooltip ${activeLink.includes("/dashbord/article") ? "active" : ""
                }`}
              onClick={() => handleLinkClick("/dashbord/article")}
            >
              <span className="link hide">Article</span>
              <span className="tooltip__content">Article</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashbord/create-new-article"
              title="CreateNewArticle"
              className={`tooltip ${activeLink.includes("/dashbord/create-new-article")
                  ? "active"
                  : ""
                }`}
              onClick={() => handleLinkClick("/dashbord/create-new-article")}
            >
              <span className="link hide">Create New Article</span>
              <span className="tooltip__content">Create New Article</span>
            </Link>
          </li>
          <li>
            <Link
              to="/technicians/createAccount"
              title="Create Technician Account"
              className={`tooltip ${activeLink.includes("/technicians/createAccount")
                  ? "active"
                  : ""
                }`}
              onClick={() => handleLinkClick("/technicians/createAccount")}
            >
              
              <span className="link hide">Create Account</span>
              <span className="tooltip__content">Create Account</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/Reports"
              title="CreateNewArticle"
              className={`tooltip ${activeLink.includes("/admin/Reports") ? "active" : ""
                }`}
              onClick={() => handleLinkClick("/admin/Reports")}
            >
            

              <span className="link hide">ٌReports</span>
              <span className="tooltip__content">ٌReports</span>
            </Link>
          </li>
          <li>
            <Link
              to="/DashboardAnalysis"
              title="Dashboard Analysis"
              className={`tooltip ${activeLink.includes("/DashboardAnalysis") ? "active" : ""
                }`}
              onClick={() => handleLinkClick("/DashboardAnalysis")}
            >
             
              <span className="link hide">Analysis</span>
              <span className="tooltip__content">Analysis</span>
            </Link>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
