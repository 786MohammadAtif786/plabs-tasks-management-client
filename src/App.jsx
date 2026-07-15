// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import { AuthProvider } from "./context/AuthContext";
// import Navbar from "./components/Navbar";
// import Auth from "./pages/Auth";
// import PublicRoute from "./components/PublicRoute";
// import PrivateRoute from "./components/PrivateRoute";

// <Routes>
//   <Route
//     path="/login"
//     element={
//       <PublicRoute>
//         <Auth />
//       </PublicRoute>
//     }
//   />
//   {/* checkout jaise protected pages ho to aise wrap karo: */}
//   {/* <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} /> */}
// </Routes>
// // baaki tumhare existing pages/components

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route path="/login" element={<Auth />} />
//           {/* baaki tumhare existing routes yahan */}
//         </Routes>
//         <ToastContainer position="top-right" autoClose={3000} />
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import AddTask from "./pages/AddTask";
import MyTasks from "./pages/MyTasks";
import EditTask from "./pages/EditTask";
import TaskApproval from "./pages/TaskApproval";
import RoleRoute from "./components/RoleRoute";
import Settings from "./pages/Settings";
import Home from "./pages/Home";


// yaha apne baaki existing pages import karo
// import Home from "./pages/Home";
// import SearchResults from "./pages/SearchResults";
// import SeatSelection from "./pages/SeatSelection";
// import Checkout from "./pages/Checkout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Public route - already logged in ho to yaha se home bhej dega */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />

          <Route path="/add-task" element={<PrivateRoute><AddTask /></PrivateRoute>} />
          <Route path="/my-tasks" element={<PrivateRoute><MyTasks /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />


          <Route path="/edit-task/:id" element={<PrivateRoute><EditTask /></PrivateRoute>} />
          <Route
            path="/task-approval"
            element={
              <RoleRoute allowedRoles={["admin", "manager"]}>
                <TaskApproval />
              </RoleRoute>
  } />
          {/* Tumhare existing normal routes yaha aayenge, jaise: */}
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/search" element={<SearchResults />} /> */}
          {/* <Route path="/seat-selection/:busId" element={<SeatSelection />} /> */}

          {/* Protected route ka example - login required pages ke liye */}
          {/* <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          /> */}
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;