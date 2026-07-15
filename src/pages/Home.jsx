// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import MyTasks from "./MyTasks";

// const Home = () => {
//   const { isAuthenticated } = useAuth();

//   // Login hai to seedha uske saare tasks dikha do
//   if (isAuthenticated) {
//     return <MyTasks />;
//   }

//   // Login nahi hai to simple welcome screen
//   return (
//     <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
//       <h1 className="text-3xl font-bold text-gray-800 mb-2">
//         Welcome to GreenBus
//       </h1>
//       <p className="text-gray-500 mb-6">
//         Apne tasks dekhne aur manage karne ke liye login karo.
//       </p>
//       <Link
//         to="/login"
//         className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
//       >
//         Login
//       </Link>
//     </div>
//   );
// };

// export default Home;


import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MyTasks from "./MyTasks";
import TaskApproval from "./TaskApproval";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    const isManagerOrAdmin = user?.role === "manager" || user?.role === "admin";

    // Manager/Admin ko apne tasks nahi, approval wala data dikhega
    if (isManagerOrAdmin) {
      return <TaskApproval />;
    }

    // Employee ko apne tasks dikhenge
    return <MyTasks />;
  }

  // Login nahi hai to simple welcome screen
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Welcome to percipience labs
      </h1>
      <p className="text-gray-500 mb-6">
        {/* Apne tasks dekhne aur manage karne ke liye login karo. */}
        Log in to view and manage your tasks.
      </p>
      <Link
        to="/login"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
      >
        Login
      </Link>
    </div>
  );
};

export default Home;