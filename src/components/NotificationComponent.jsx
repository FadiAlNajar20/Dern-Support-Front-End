import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth } from "../contexts/auth";

const NotificationComponent = () => {
 // const { user, logoutUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const socketRef = useRef(null);


  const userRole = localStorage.getItem("userType");

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(import.meta.env.VITE_SERVER_URL);
    }

    const socket = socketRef.current;

    socket.on("newRequest", (data) => {
      console.log(data);

      
      if (data.role === userRole) {
        setNotifications((prev) => {
          if (prev.some((notif) => notif.id === data.id)) {
            return prev;
          }
          setHasNewNotifications(true);
          return [...prev, data];
        });
      }
    });
  }, [socketRef, userRole]); 

  const toggleNotificationList = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewNotifications(false);
    }
  };

  const handleShowNotification = (notification) => {
    window.location.href = `/allRequests`;
  };

  return (
    <div className="relative">
      <button
        className="relative p-2 text-yellow-500 hover:text-yellow-200 focus:outline-none"
        onClick={toggleNotificationList}
      >
        <i className="fas fa-bell text-2xl"></i>
        {hasNewNotifications && notifications.length > 0 && (
          <span className="absolute top-0 right-0 block h-4 w-4 text-xs text-white bg-red-500 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 backdrop-blur-lg shadow-lg rounded-lg border border-gray-300 z-50">
          <div className="p-4 max-h-80 overflow-y-auto space-y-2 custom-scrollbar">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="relative flex flex-col justify-between p-4 bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg"
                >
                  <p className="text-sm text-white">{notif.message}</p>
                  {userRole=="customers"? <button
                    onClick={() => handleShowNotification(notif)}
                    className="mt-2 self-end text-blue-400 hover:text-blue-600 text-xs px-3 py-1 rounded border border-blue-600"
                  >
                    Show
                  </button>:<></>}
                 
                </div>
              ))
            ) : (
              <p className="text-gray-100 text-sm">No notifications</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
