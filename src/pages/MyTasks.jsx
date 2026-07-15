

// // import { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import { getMyTasks, deleteTask, updateTask } from "../api/taskApi";

// // const STATUSES = ["Pending", "In Progress", "Completed", "Blocked"];

// // const statusColors = {
// //   Pending: "bg-yellow-100 text-yellow-700",
// //   "In Progress": "bg-blue-100 text-blue-700",
// //   Completed: "bg-green-100 text-green-700",
// //   Blocked: "bg-red-100 text-red-700",
// // };

// // const approvalColors = {
// //   Pending: "bg-gray-100 text-gray-600",
// //   Approved: "bg-green-100 text-green-700",
// //   Rejected: "bg-red-100 text-red-700",
// // };

// // // Task name lambा hone par word-limit tak truncate karo
// // const TASK_NAME_WORD_LIMIT = 6;

// // const truncateTaskName = (name = "", wordLimit = TASK_NAME_WORD_LIMIT) => {
// //   const words = name.trim().split(/\s+/);
// //   if (words.length <= wordLimit) return name;
// //   return words.slice(0, wordLimit).join(" ") + "...";
// // };

// // const MyTasks = () => {
// //   const [tasks, setTasks] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [updatingId, setUpdatingId] = useState(null);

// //   const fetchTasks = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await getMyTasks();
// //       setTasks(res.data.tasks || res.data);
// //     } catch (err) {
// //       toast.error("Tasks load nahi ho paye");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchTasks();
// //   }, []);

// //   const handleStatusChange = async (taskId, newStatus) => {
// //     try {
// //       setUpdatingId(taskId);
// //       await updateTask(taskId, { status: newStatus });
// //       setTasks((prev) =>
// //         prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
// //       );
// //       toast.success("Status updated");
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Status update nahi ho paya");
// //     } finally {
// //       setUpdatingId(null);
// //     }
// //   };

// //   const handleResend = async (taskId) => {
// //     try {
// //       setUpdatingId(taskId);
// //       await updateTask(taskId, { approvalStatus: "Pending", approvalRemark: "" });
// //       setTasks((prev) =>
// //         prev.map((t) =>
// //           t._id === taskId
// //             ? { ...t, approvalStatus: "Pending", approvalRemark: "" }
// //             : t
// //         )
// //       );
// //       toast.success("Your task has been resubmitted for approval.");
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Resend nahi ho paya");
// //     } finally {
// //       setUpdatingId(null);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Task delete karna hai?")) return;

// //     try {
// //       await deleteTask(id);
// //       toast.success("Task deleted");
// //       setTasks((prev) => prev.filter((t) => t._id !== id));
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Delete task successfully");
// //     }
// //   };

// //   return (
// //     <div className="max-w-5xl mx-auto p-6">
// //       <div className="flex items-center justify-between mb-6">
// //         <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
// //         <Link
// //           to="/add-task"
// //           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
// //         >
// //           + Add Task
// //         </Link>
// //       </div>

// //       {loading ? (
// //         <p className="text-gray-500">Loading...</p>
// //       ) : tasks.length === 0 ? (
// //         <p className="text-gray-500">No tasks available. Create your first task to get started.</p>
// //       ) : (
// //         <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
// //           <table className="w-full text-sm">
// //             <thead>
// //               <tr className="bg-gray-50 text-left text-gray-600">
// //                 <th className="px-4 py-3">Task Name</th>
// //                 <th className="px-4 py-3">Type</th>
// //                 <th className="px-4 py-3">Department</th>
// //                 <th className="px-4 py-3">Status</th>
// //                 <th className="px-4 py-3">Approval</th>
// //                 <th className="px-4 py-3">Remark</th>
// //                 <th className="px-4 py-3">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {tasks.map((task) => {
// //                 const isApproved = task.approvalStatus === "Approved";
// //                 return (
// //                   <tr key={task._id} className="border-t border-gray-100">
// //                     <td
// //                       className="px-4 py-3 font-medium text-gray-800 max-w-[220px]"
// //                       title={task.taskName}
// //                     >
// //                       {truncateTaskName(task.taskName)}
// //                     </td>
// //                     <td className="px-4 py-3">{task.taskType}</td>
// //                     <td className="px-4 py-3">{task.department}</td>
// //                     <td className="px-4 py-3">
// //                       <select
// //                         value={task.status}
// //                         disabled={updatingId === task._id || isApproved}
// //                         title={
// //                           isApproved
// //                             ? "Approved task ka status change nahi kar sakte"
// //                             : ""
// //                         }
// //                         onChange={(e) =>
// //                           handleStatusChange(task._id, e.target.value)
// //                         }
// //                         className={`px-2 py-1 rounded-full text-xs font-medium border-none focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
// //                           statusColors[task.status] || "bg-gray-100"
// //                         }`}
// //                       >
// //                         {STATUSES.map((s) => (
// //                           <option key={s} value={s}>
// //                             {s}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </td>
// //                     <td className="px-4 py-3">
// //                       <div className="flex items-center gap-2">
// //                         <span
// //                           className={`px-2 py-1 rounded-full text-xs font-medium ${
// //                             approvalColors[task.approvalStatus] || "bg-gray-100"
// //                           }`}
// //                         >
// //                           {task.approvalStatus}
// //                         </span>
// //                         {task.approvalStatus === "Rejected" && (
// //                           <button
// //                             onClick={() => handleResend(task._id)}
// //                             disabled={updatingId === task._id}
// //                             className="text-xs text-blue-600 hover:underline disabled:opacity-60"
// //                           >
// //                             Resend
// //                           </button>
// //                         )}
// //                       </div>
// //                     </td>
// //                     <td className="px-4 py-3 text-gray-500">
// //                       {task.approvalRemark || "-"}
// //                     </td>
// //                     <td className="px-4 py-3">
// //                       <div className="flex gap-2">
// //                         <Link
// //                           to={`/edit-task/${task._id}`}
// //                           className="text-blue-600 hover:underline"
// //                         >
// //                           Edit
// //                         </Link>
// //                         <button
// //                           onClick={() => handleDelete(task._id)}
// //                           className="text-red-600 hover:underline"
// //                         >
// //                           Delete
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 );
// //               })}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default MyTasks;



// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { getMyTasks, deleteTask, updateTask } from "../api/taskApi";

// const STATUSES = ["Pending", "In Progress", "Completed", "Blocked"];

// const statusColors = {
//   Pending: "bg-yellow-100 text-yellow-700",
//   "In Progress": "bg-blue-100 text-blue-700",
//   Completed: "bg-green-100 text-green-700",
//   Blocked: "bg-red-100 text-red-700",
// };

// const approvalColors = {
//   Pending: "bg-gray-100 text-gray-600",
//   Approved: "bg-green-100 text-green-700",
//   Rejected: "bg-red-100 text-red-700",
// };

// // Task name lambा hone par word-limit tak truncate karo
// const TASK_NAME_WORD_LIMIT = 6;

// const truncateTaskName = (name = "", wordLimit = TASK_NAME_WORD_LIMIT) => {
//   const words = name.trim().split(/\s+/);
//   if (words.length <= wordLimit) return name;
//   return words.slice(0, wordLimit).join(" ") + "...";
// };

// // Ek page pe kitni rows dikhani hain
// const ITEMS_PER_PAGE = 6;

// const MyTasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updatingId, setUpdatingId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await getMyTasks();
//       setTasks(res.data.tasks || res.data);
//     } catch (err) {
//       toast.error("Tasks load nahi ho paye");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleStatusChange = async (taskId, newStatus) => {
//     try {
//       setUpdatingId(taskId);
//       await updateTask(taskId, { status: newStatus });
//       setTasks((prev) =>
//         prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
//       );
//       toast.success("Status updated");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Status update nahi ho paya");
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   const handleResend = async (taskId) => {
//     try {
//       setUpdatingId(taskId);
//       await updateTask(taskId, { approvalStatus: "Pending", approvalRemark: "" });
//       setTasks((prev) =>
//         prev.map((t) =>
//           t._id === taskId
//             ? { ...t, approvalStatus: "Pending", approvalRemark: "" }
//             : t
//         )
//       );
//       toast.success("Your task has been resubmitted for approval.");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Resend nahi ho paya");
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Task delete karna hai?")) return;

//     try {
//       await deleteTask(id);
//       toast.success("Task deleted");
//       setTasks((prev) => prev.filter((t) => t._id !== id));
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Delete task successfully");
//     }
//   };

//   // --- Pagination calculations ---
//   const totalPages = Math.max(1, Math.ceil(tasks.length / ITEMS_PER_PAGE));
//   const safePage = Math.min(currentPage, totalPages);
//   const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
//   const paginatedTasks = tasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

//   const goToPage = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
//         <Link
//           to="/add-task"
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
//         >
//           + Add Task
//         </Link>
//       </div>

//       {loading ? (
//         <p className="text-gray-500">Loading...</p>
//       ) : tasks.length === 0 ? (
//         <p className="text-gray-500">No tasks available. Create your first task to get started.</p>
//       ) : (
//         <>
//           <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="bg-gray-50 text-left text-gray-600">
//                   <th className="px-4 py-3">Task Name</th>
//                   <th className="px-4 py-3">Type</th>
//                   <th className="px-4 py-3">Department</th>
//                   <th className="px-4 py-3">Status</th>
//                   <th className="px-4 py-3">Approval</th>
//                   <th className="px-4 py-3">Remark</th>
//                   <th className="px-4 py-3">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedTasks.map((task) => {
//                   const isApproved = task.approvalStatus === "Approved";
//                   return (
//                     <tr key={task._id} className="border-t border-gray-100">
//                       <td
//                         className="px-4 py-3 font-medium text-gray-800 max-w-[220px]"
//                         title={task.taskName}
//                       >
//                         {truncateTaskName(task.taskName)}
//                       </td>
//                       <td className="px-4 py-3">{task.taskType}</td>
//                       <td className="px-4 py-3">{task.department}</td>
//                       <td className="px-4 py-3">
//                         <select
//                           value={task.status}
//                           disabled={updatingId === task._id || isApproved}
//                           title={
//                             isApproved
//                               ? "Approved task ka status change nahi kar sakte"
//                               : ""
//                           }
//                           onChange={(e) =>
//                             handleStatusChange(task._id, e.target.value)
//                           }
//                           className={`px-2 py-1 rounded-full text-xs font-medium border-none focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
//                             statusColors[task.status] || "bg-gray-100"
//                           }`}
//                         >
//                           {STATUSES.map((s) => (
//                             <option key={s} value={s}>
//                               {s}
//                             </option>
//                           ))}
//                         </select>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-2">
//                           <span
//                             className={`px-2 py-1 rounded-full text-xs font-medium ${
//                               approvalColors[task.approvalStatus] || "bg-gray-100"
//                             }`}
//                           >
//                             {task.approvalStatus}
//                           </span>
//                           {task.approvalStatus === "Rejected" && (
//                             <button
//                               onClick={() => handleResend(task._id)}
//                               disabled={updatingId === task._id}
//                               className="text-xs text-blue-600 hover:underline disabled:opacity-60"
//                             >
//                               Resend
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 text-gray-500">
//                         {task.approvalRemark || "-"}
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex gap-2">
//                           <Link
//                             to={`/edit-task/${task._id}`}
//                             className="text-blue-600 hover:underline"
//                           >
//                             Edit
//                           </Link>
//                           <button
//                             onClick={() => handleDelete(task._id)}
//                             className="text-red-600 hover:underline"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination controls */}
//           <div className="flex items-center justify-center gap-2 mt-4">
//             <button
//               onClick={() => goToPage(safePage - 1)}
//               disabled={safePage === 1}
//               className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:border-green-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200"
//             >
//               Prev
//             </button>

//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={page}
//                 onClick={() => goToPage(page)}
//                 className={`w-9 h-9 rounded-lg text-sm font-medium border transition-colors ${
//                   page === safePage
//                     ? "bg-green-600 text-white border-green-600"
//                     : "bg-white text-gray-600 border-gray-200 hover:border-green-300"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}

//             <button
//               onClick={() => goToPage(safePage + 1)}
//               disabled={safePage === totalPages}
//               className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:border-green-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200"
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default MyTasks;



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMyTasks, deleteTask, updateTask } from "../api/taskApi";

const STATUSES = ["Pending", "In Progress", "Completed", "Blocked"];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Blocked: "bg-red-100 text-red-700",
};

const approvalColors = {
  Pending: "bg-gray-100 text-gray-600",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

// Task name lambा hone par word-limit tak truncate karo
const TASK_NAME_WORD_LIMIT = 6;

const truncateTaskName = (name = "", wordLimit = TASK_NAME_WORD_LIMIT) => {
  const words = name.trim().split(/\s+/);
  if (words.length <= wordLimit) return name;
  return words.slice(0, wordLimit).join(" ") + "...";
};

// Ek page pe kitni rows dikhani hain
const ITEMS_PER_PAGE = 6;

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getMyTasks();
      setTasks(res.data.tasks || res.data);
    } catch (err) {
      toast.error("Tasks load nahi ho paye");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      setUpdatingId(taskId);
      await updateTask(taskId, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
      );
      toast.success("Status updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Status update nahi ho paya");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleResend = async (taskId) => {
    try {
      setUpdatingId(taskId);
      await updateTask(taskId, { approvalStatus: "Pending", approvalRemark: "" });
      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId
            ? { ...t, approvalStatus: "Pending", approvalRemark: "" }
            : t
        )
      );
      toast.success("Your task has been resubmitted for approval.");
    } catch (err) {
      // toast.error(err.response?.data?.message || "Resend nahi ho paya");
      toast.error(
      err.response?.data?.message || "Failed to resend. Please try again."
    );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Do you want to delet task?")) return;

    try {
      await deleteTask(id);
      toast.success("Task deleted");
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete task successfully");
    }
  };

  // --- Pagination calculations ---
  const totalPages = Math.max(1, Math.ceil(tasks.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedTasks = tasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
        <Link
          to="/add-task"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + Add Task
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500">No tasks available. Create your first task to get started.</p>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-600">
                  <th className="px-4 py-3">Task Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Approval</th>
                  <th className="px-4 py-3">Remark</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTasks.map((task) => {
                  const isApproved = task.approvalStatus === "Approved";
                  return (
                    <tr key={task._id} className="border-t border-gray-100">
                      <td
                        className="px-4 py-3 font-medium text-gray-800 max-w-[220px]"
                        title={task.taskName}
                      >
                        {truncateTaskName(task.taskName)}
                      </td>
                      <td className="px-4 py-3">{task.taskType}</td>
                      <td className="px-4 py-3">{task.department}</td>
                      <td className="px-4 py-3">
                        <select
                          value={task.status}
                          disabled={updatingId === task._id || isApproved}
                          title={
                            isApproved
                              ? "Approved task ka status change nahi kar sakte"
                              : ""
                          }
                          onChange={(e) =>
                            handleStatusChange(task._id, e.target.value)
                          }
                          className={`px-2 py-1 rounded-full text-xs font-medium border-none focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                            statusColors[task.status] || "bg-gray-100"
                          }`}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              approvalColors[task.approvalStatus] || "bg-gray-100"
                            }`}
                          >
                            {task.approvalStatus}
                          </span>
                          {task.approvalStatus === "Rejected" && (
                            <button
                              onClick={() => handleResend(task._id)}
                              disabled={updatingId === task._id}
                              className="text-xs text-blue-600 hover:underline disabled:opacity-60"
                            >
                              Resend
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {task.approvalRemark || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Link
                            to={`/edit-task/${task._id}`}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination controls - sirf tab dikhao jab 1 se zyada page ho */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
                className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:border-green-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium border transition-colors ${
                    page === safePage
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-green-300"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage === totalPages}
                className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:border-green-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyTasks;