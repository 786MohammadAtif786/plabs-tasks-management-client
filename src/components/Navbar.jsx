// // // import { Link, useNavigate } from "react-router-dom";
// // // import { toast } from "react-toastify";
// // // import { useAuth } from "../context/AuthContext";

// // // const Navbar = () => {
// // //   const { isAuthenticated, user, logout } = useAuth();
// // //   const navigate = useNavigate();

// // //   const handleLogout = () => {
// // //     logout();
// // //     toast.success("Logged out successfully");
// // //     navigate("/login");
// // //   };

// // //   return (
// // //     <nav className="bg-white shadow-sm sticky top-0 z-50">
// // //       <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
// // //         <Link to="/" className="text-xl font-bold text-green-600">
// // //           GreenBus
// // //         </Link>

// // //         <div className="flex items-center gap-4">
// // //           <Link to="/" className="text-gray-700 hover:text-green-600">
// // //             Home
// // //           </Link>

// // //           {isAuthenticated ? (
// // //             <>
// // //               <span className="text-gray-600 text-sm hidden sm:inline">
// // //                 Hi, {user?.name || "User"}
// // //               </span>
// // //               <button
// // //                 onClick={handleLogout}
// // //                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
// // //               >
// // //                 Logout
// // //               </button>
// // //             </>
// // //           ) : (
// // //             <Link
// // //               to="/login"
// // //               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
// // //             >
// // //               Login
// // //             </Link>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   );
// // // };

// // // export default Navbar;




// // import { Link, useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import api from "../api/axios";
// // import { useAuth } from "../context/AuthContext";

// // const Navbar = () => {
// //   const { isAuthenticated, user, logout } = useAuth();
// //   const navigate = useNavigate();

// //   const handleLogout = async () => {
// //     try {
// //       await api.post("/auth/logout");
// //     } catch (err) {
// //       // backend fail ho bhi jaye to bhi frontend se logout hona chahiye
// //       console.log("Logout API failed:", err);
// //     } finally {
// //       logout(); // localStorage se token/user delete karta hai
// //       toast.success("Logged out successfully");
// //       navigate("/login");
// //     }
// //   };

// //   return (
// //     <nav className="bg-white shadow-sm sticky top-0 z-50">
// //       <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
// //         <Link to="/" className="text-xl font-bold text-green-600">
// //           Percipience Labs
// //         </Link>

// //         <div className="flex items-center gap-4">
// //           <Link to="/" className="text-gray-700 hover:text-green-600">
// //             Home
// //           </Link>

// //           {isAuthenticated ? (
// //             <>
// //               <span className="text-gray-600 text-sm hidden sm:inline">
// //                 Hi, {user?.name || "User"}
// //               </span>
// //               <button
// //                 onClick={handleLogout}
// //                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
// //               >
// //                 Logout
// //               </button>
// //             </>
// //           ) : (
// //             <Link
// //               to="/login"
// //               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
// //             >
// //               Login
// //             </Link>
// //           )}
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;



// import { useState, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../api/axios";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const { isAuthenticated, user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const isManagerOrAdmin = user?.role === "manager" || user?.role === "admin";

//   // Dropdown ke bahar click karne pe close ho jaye
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await api.post("/auth/logout");
//     } catch (err) {
//       console.log("Logout API failed:", err);
//     } finally {
//       logout();
//       toast.success("Logged out successfully");
//       setDropdownOpen(false);
//       setMobileOpen(false);
//       navigate("/login");
//     }
//   };

//   const closeMenus = () => {
//     setDropdownOpen(false);
//     setMobileOpen(false);
//   };

//   return (
//     <nav className="bg-white shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           <Link to="/" className="text-xl font-bold text-green-600">
//             GreenBus
//           </Link>

//           {/* Desktop menu */}
//           <div className="hidden md:flex items-center gap-4">
//             <Link to="/" className="text-gray-700 hover:text-green-600">
//               Home
//             </Link>

//             {isAuthenticated ? (
//               <div className="relative" ref={dropdownRef}>
//                 <button
//                   onClick={() => setDropdownOpen((prev) => !prev)}
//                   className="flex items-center gap-1 text-gray-700 hover:text-green-600 font-medium"
//                 >
//                   Hi, {user?.name || "User"}
//                   <svg
//                     className={`w-4 h-4 transition-transform ${
//                       dropdownOpen ? "rotate-180" : ""
//                     }`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </button>

//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
//                     <Link
//                       to="/my-tasks"
//                       onClick={closeMenus}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                     >
//                       My Tasks
//                     </Link>
//                     <Link
//                       to="/add-task"
//                       onClick={closeMenus}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                     >
//                       Add Task
//                     </Link>
//                     {isManagerOrAdmin && (
//                       <Link
//                         to="/task-approval"
//                         onClick={closeMenus}
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                       >
//                         Task Approval
//                       </Link>
//                     )}
//                     <hr className="my-1 border-gray-100" />
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//               >
//                 Login
//               </Link>
//             )}
//           </div>

//           {/* Mobile hamburger button */}
//           <button
//             onClick={() => setMobileOpen((prev) => !prev)}
//             className="md:hidden p-2 text-gray-700"
//             aria-label="Toggle menu"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               {mobileOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Mobile menu */}
//         {mobileOpen && (
//           <div className="md:hidden border-t border-gray-100 py-2 space-y-1">
//             <Link
//               to="/"
//               onClick={closeMenus}
//               className="block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
//             >
//               Home
//             </Link>

//             {isAuthenticated ? (
//               <>
//                 <p className="px-2 py-1 text-sm text-gray-400">
//                   Hi, {user?.name || "User"}
//                 </p>
//                 <Link
//                   to="/my-tasks"
//                   onClick={closeMenus}
//                   className="block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
//                 >
//                   My Tasks
//                 </Link>
//                 <Link
//                   to="/add-task"
//                   onClick={closeMenus}
//                   className="block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
//                 >
//                   Add Task
//                 </Link>
//                 {isManagerOrAdmin && (
//                   <Link
//                     to="/task-approval"
//                     onClick={closeMenus}
//                     className="block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
//                   >
//                     Task Approval
//                   </Link>
//                 )}
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-2 py-2 text-red-600 hover:bg-gray-50 rounded-lg"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link
//                 to="/login"
//                 onClick={closeMenus}
//                 className="block px-2 py-2 bg-green-600 text-white rounded-lg text-center"
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isManagerOrAdmin = user?.role === "manager" || user?.role === "admin";

  // Dropdown ke bahar click karne pe close ho jaye
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.log("Logout API failed:", err);
    } finally {
      logout();
      toast.success("Logged out successfully");
      setDropdownOpen(false);
      setMobileOpen(false);
      navigate("/login");
    }
  };

  const closeMenus = () => {
    setDropdownOpen(false);
    setMobileOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-green-600">
            percipience labs
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">
            {/* <Link to="/" className="text-gray-700 hover:text-green-600">
              Home
            </Link> */}

            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium"
                >
                  <Avatar name={user?.name} src={user?.avatar} size="w-8 h-8" />
                  Hi, {user?.name || "User"}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                    <Link
                      to="/my-tasks"
                      onClick={closeMenus}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      My Tasks
                    </Link>
                    <Link
                      to="/add-task"
                      onClick={closeMenus}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Add Task
                    </Link>
                    {isManagerOrAdmin && (
                      <Link
                        to="/task-approval"
                        onClick={closeMenus}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Task Approval
                      </Link>
                    )}
                    <Link
                      to="/settings"
                      onClick={closeMenus}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Settings
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 text-gray-700"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-2 space-y-1">
            <Link
              to="/"
              onClick={closeMenus}
              className="block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Home
            </Link>

            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 px-2 py-1">
                  <Avatar name={user?.name} src={user?.avatar} size="w-8 h-8" />
                  <p className="text-sm text-gray-500">
                    Hi, {user?.name || "User"}
                  </p>
                </div>
                <Link
                  to="/my-tasks"
                  onClick={closeMenus}
                  className="block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  My Tasks
                </Link>
                <Link
                  to="/add-task"
                  onClick={closeMenus}
                  className="block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Add Task
                </Link>
                {isManagerOrAdmin && (
                  <Link
                    to="/task-approval"
                    onClick={closeMenus}
                    className="block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    Task Approval
                  </Link>
                )}
                <Link
                  to="/settings"
                  onClick={closeMenus}
                  className="block px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2 py-2 text-red-600 hover:bg-gray-50 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={closeMenus}
                className="block px-2 py-2 bg-green-600 text-white rounded-lg text-center"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;