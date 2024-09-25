// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const VerifyEmailPage = () => {
//   // Use the `useNavigate` hook from react-router-dom to navigate between pages
//   const navigate = useNavigate();

//   // Function to redirect to the login page
//   const handleLoginRedirect = () => {
//     navigate("/login"); // Navigates to the login route when the button is clicked
//   };

//   return (
//     // Main container to center content vertically and horizontally
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       {/* Box to display the email verification message */}
//       <div className="bg-white p-8 shadow-lg rounded-lg max-w-md text-center">
//         {/* Title for email verification */}
//         <h1 className="text-3xl font-bold mb-4 text-indigo-600">Email Verification Required</h1>
//         {/* Message prompting the user to check their email */}
//         <p className="text-gray-600 mb-6">
//           Thank you for registering! Please check your email to verify your account.
//         </p>
//         {/* Message instructing the user to proceed after verification */}
//         <p className="text-gray-600 mb-6">
//           Once your account is verified, click the button below to proceed to login.
//         </p>
//         <div className="mb-6">
//           {/* Link to open the user's email in a new tab */}
//           <a 
//             href="https://mail.google.com" // You can change this link to match the client's email service
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="text-blue-500 underline hover:text-blue-700 transition"
//           >
//             Open your email
//           </a>
//         </div>
//         {/* Button to navigate to the login page */}
//         <button 
//           onClick={handleLoginRedirect} 
//           className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
//         >
//           Go to Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VerifyEmailPage;
