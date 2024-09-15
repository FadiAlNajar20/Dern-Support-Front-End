// eslint-disable-next-line no-unused-vars
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./contexts/auth";
import Home from "./pages/customer-pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/customer-pages/Services";
import Articles from "./pages/customer-pages/Articles";
import ServiceByID from "./pages/ServiceByID";
import ScrollToTop from "./functions/ScrollToTop";
import ArticleByID from "./pages/customer-pages/ArticleByID";
import NewRequest from "./pages/customer-pages/NewRequest/newRequest";
import ViewAllRequests from "./pages/customer-pages/ViewAllRequests";
// import Dashbord from "./pages/admin-pages/Dashbord";
import AdminViewAllRequest from "./pages/admin-pages/AdminViewAllRequest";
import AdminViewByID from './pages/admin-pages/AdminViewByID';
import TechnicainTasks from "./pages/TechnicianTasks";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DashboardAnalysis from "./pages/admin-pages/Analysis";
import VerifyEmailPage from "./pages/VerifyEmailPage";

import AddNewService from "./pages/admin-pages/AddNewService";
import CreateTechnicianAccount from "./pages/admin-pages/CreateTechnicianAccount";
import NotFound from "./pages/NotFound";
import Header from "./components/customer-components/Header";
import Footer from "./components/customer-components/Footer";
import DashbordArticlesID from "./pages/admin-pages/DashbordArticlesID";
import DashbordArticles from "./pages/admin-pages/DashbordArticles";
import CreateNewArticle from "./pages/admin-pages/CreateNewArticle";
import ViewAllServices from "./pages/admin-pages/ViewAllServices";
import SparesPage from "./pages/admin-pages/SparesPage";
import ServiceInAdmin from "./pages/admin-pages/ServiceInAdmin";
import ReportsList from "./pages/admin-pages/Reports";
import Sidebar from "./components/Sidebar/Sidebar";
import NotificationComponent from "./components/NotificationComponent";
import LogoutButton from "./components/LogoutButton";


export default function App() {
  const { user,logoutUser } = useAuth();
  const [open, setOpen] = useState(false);
  const userType=localStorage.getItem("userType");
  const Layout = ({ children }) => {

    return (
      <div className="flex flex-col h-screen">
        {/* <header className="w-full p-4 bg-gray-800 text-white fixed top-0 left-0 z-10 flex justify-between items-center">
          <h1 className="text-xl">dashboard</h1>
          <div className="flex items-center space-x-4">
            <NotificationComponent />
            <LogoutButton onClick={() => {
                logoutUser();
                setOpen(false); 
                // Ensure menu closes on logout
              }}/>
          </div>
        </header> */}
  
        <div className="flex flex-1" style={{ paddingTop: "4rem" }}>
          {userType=="admin"?<Sidebar style={{ top: "50rem" }} />:<></>}
          
          <div className="flex-1 p-4" style={{ marginLeft: "18rem" }}>
            {children}
          </div>
        </div>
      </div>
    );
  };
  


  const location = useLocation();
  const currentPath = location.pathname;

  // Determine the role based on the path
  // Determine if the current path should show the header and footer

  const isHome = currentPath === "/";
  const isCustomer = isHome || currentPath.startsWith("/customers");
  const isAdmin = currentPath.startsWith("/admin");
  const isTechnician = currentPath.startsWith("/technician");

  // Check for specific paths where the header and footer should be displayed
  const isArticlesOrServices =
    currentPath.startsWith("/articles") ||
    currentPath.startsWith("/services") ||
    currentPath.startsWith("/register") ||
    currentPath.startsWith("/allRequests") ||
    currentPath.startsWith("/newRequest") ||
    currentPath.startsWith("/login");

  return (
    <div className="font-poppins w-full h-full flex flex-col justify-between min-h-screen">
      {/* </div> <div className="font-poppins w-full h-full flex flex-col justify-between"> */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <ScrollToTop />

      {/* Render Header for customer role, home, articles, and services */}
      {(isCustomer || isHome || isArticlesOrServices) && <Header />}
{/*  */}
      <main className="flex flex-col justify-center h-full grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />

          <Route path="/technicainTasks" element={<TechnicainTasks />} />
          <Route
            path="/spares"
            element={
              <Layout>
                <SparesPage />
              </Layout>
            }
          />
          <Route path="/newRequest" element={<NewRequest />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceByID />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleByID />} />
          <Route path="/allRequests" element={<ViewAllRequests />} />

          <Route path="/AddNewService" element={ <Layout><AddNewService /></Layout> } />
          <Route
            path="/admin/ViewAllServices"
            element={
              <Layout>
                <ViewAllServices />
              </Layout>
            }
          />
          <Route
            path="/DashboardAnalysis"
            element={
              <Layout>
                <DashboardAnalysis />
              </Layout>
            }
          />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route
            path="/technicians/createAccount"
            element={
              <Layout>
                <CreateTechnicianAccount />
              </Layout>
            }
          />
          <Route
            path="/dashbord/article/:id"
            element={
              <Layout>
                <DashbordArticlesID />
              </Layout>
            }
          />
          <Route
            path="/dashbord/article"
            element={
              <Layout>
                <DashbordArticles />
              </Layout>
            }
          />
          <Route
            path="/dashbord/create-new-article"
            element={
              <Layout>
                <CreateNewArticle />
              </Layout>
            }
          />
          <Route
            path="/support-requests/getAll"
            element={
              <Layout>
                <AdminViewAllRequest />
              </Layout>
            }
          />
          <Route
            path="/support-requests/getAll/:id"
            element={
              <Layout>
                <AdminViewByID />
              </Layout>
            }
          />
          <Route path="/servicesInAdmin/:id" element={<ServiceInAdmin />} />
          <Route
            path="/technicians/createAccount"
            element={<CreateTechnicianAccount />}
          />
          <Route
            path="/dashbord/article/:id"
            element={
              <Layout>
                <DashbordArticlesID />
              </Layout>
            }
          />
          <Route
            path="/dashbord/article"
            element={
              <Layout>
                <DashbordArticles />
              </Layout>
            }
          />
          <Route
            path="/dashbord/create-new-article"
            element={<CreateNewArticle />}
          />
          <Route path="/support-requests/getAll" element={<AdminViewAllRequest />} />
          <Route
            path="/support-requests/getAll/:id"
            element={<AdminViewByID />}
          />
          <Route
            path="/admin/Reports"
            element={
              <Layout>
                <ReportsList />
              </Layout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Render Header for customer role, home, articles, and services */}
      {(isCustomer || isHome || isArticlesOrServices) && <Footer />}
    </div>
  );
}
