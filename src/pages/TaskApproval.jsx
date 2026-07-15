


// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { getAllTasks, approveTask } from "../api/taskApi";
// import socket from "../api/Socketclient";

// const approvalStyles = {
//   Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
//   Approved: "bg-green-50 text-green-700 border-green-200",
//   Rejected: "bg-red-50 text-red-700 border-red-200",
// };

// const statusStyles = {
//   Pending: "bg-gray-100 text-gray-600",
//   "In Progress": "bg-blue-100 text-blue-700",
//   Completed: "bg-green-100 text-green-700",
//   Blocked: "bg-red-100 text-red-700",
// };

// const formatDateTime = (dateStr) => {
//   if (!dateStr) return "-";
//   return new Date(dateStr).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// const getInitials = (name = "") =>
//   name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();

// // Ek page pe kitne task cards dikhane hain
// const ITEMS_PER_PAGE = 6;

// const TaskApproval = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [remarks, setRemarks] = useState({});
//   const [savingId, setSavingId] = useState(null);
//   const [filter, setFilter] = useState("Pending");
//   const [currentPage, setCurrentPage] = useState(1);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await getAllTasks();
//       setTasks(res.data.tasks || res.data);
//     } catch (err) {
//       // toast.error("Tasks load nahi ho paye");
//       toast.error("Unable to load tasks. Please try again.");

//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // --- SOCKET.IO: real-time updates ---
//   useEffect(() => {
//     // HR/manager room join karo, taaki server sirf inhi ko naye task bheje
//     // NOTE: apne auth storage ke hisaab se role yahan se nikalo
//     // (jaise localStorage me "user" object me role save hota hoga)
//     let role = "manager";
//     try {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       if (storedUser?.role) role = storedUser.role;
//     } catch {
//       // ignore, default "manager" use ho jayega
//     }

//     socket.emit("join", { role });

//     const handleTaskCreated = (newTask) => {
//       setTasks((prev) => {
//         // Duplicate na ho isliye check kar lo
//         if (prev.some((t) => t._id === newTask._id)) return prev;
//         return [newTask, ...prev];
//       });
//       // toast.info(`Naya task aaya: ${newTask.taskName}`);
//       toast.info(`A new task has been assigned: ${newTask.taskName}`);

//     };

//     const handleTaskResent = (updatedTask) => {
//       setTasks((prev) =>
//         prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
//       );
//       // toast.info(`${updatedTask.taskName} dobara review ke liye bheja gaya`);
//             toast.info(`${updatedTask.taskName} has been resubmitted for manager review.`);

//     };

//     socket.on("taskCreated", handleTaskCreated);
//     socket.on("taskResent", handleTaskResent);

//     return () => {
//       socket.off("taskCreated", handleTaskCreated);
//       socket.off("taskResent", handleTaskResent);
//     };
//   }, []);

//   // Filter badalne pe hamesha page 1 pe wapas aa jao
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [filter]);

//   const handleRemarkChange = (taskId, value) => {
//     setRemarks((prev) => ({ ...prev, [taskId]: value }));
//   };

//   const handleDecision = async (taskId, approvalStatus) => {
//     const remark = (remarks[taskId] || "").trim();

//     if (!remark) {
//       // toast.error("Remark likhna zaroori hai");
//       toast.error("Please enter a remark.");

//       return;
//     }

//     try {
//       setSavingId(taskId);
//       await approveTask(taskId, {
//         approvalStatus,
//         approvalRemark: remark,
//       });

//       // Backend response shape pe depend nahi karte - jo humne bheja wahi state me update kar dete hain
//       setTasks((prev) =>
//         prev.map((t) =>
//           t._id === taskId
//             ? {
//                 ...t,
//                 approvalStatus,
//                 approvalRemark: remark,
//                 approvedAt: new Date().toISOString(),
//               }
//             : t
//         )
//       );
//       toast.success(`Task ${approvalStatus.toLowerCase()} ho gaya`);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Kuch galat ho gaya");
//     } finally {
//       setSavingId(null);
//     }
//   };

//   const filteredTasks = tasks.filter((t) =>
//     filter === "All" ? true : t.approvalStatus === filter
//   );

//   const counts = {
//     Pending: tasks.filter((t) => t.approvalStatus === "Pending").length,
//     Approved: tasks.filter((t) => t.approvalStatus === "Approved").length,
//     Rejected: tasks.filter((t) => t.approvalStatus === "Rejected").length,
//   };

//   // --- Pagination calculations ---
//   const totalPages = Math.max(1, Math.ceil(filteredTasks.length / ITEMS_PER_PAGE));
//   const safePage = Math.min(currentPage, totalPages);
//   const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
//   const paginatedTasks = filteredTasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

//   const goToPage = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4 md:p-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Task Approval</h2>

//         {/* Filter tabs */}
//         <div className="flex flex-wrap gap-2">
//           {["Pending", "Approved", "Rejected", "All"].map((f) => (
//             <button
//               key={f}
//               onClick={() => setFilter(f)}
//               className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
//                 filter === f
//                   ? "bg-green-600 text-white border-green-600"
//                   : "bg-white text-gray-600 border-gray-200 hover:border-green-300"
//               }`}
//             >
//               {f}
//               {f !== "All" && counts[f] > 0 && (
//                 <span className="ml-1.5 text-xs opacity-80">
//                   ({counts[f]})
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {loading ? (
//         <p className="text-gray-500">Loading...</p>
//       ) : filteredTasks.length === 0 ? (
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center text-gray-400">
//           No tasks found for this filter.
//         </div>
//       ) : (
//         <>
//           <div className="space-y-4">
//             {paginatedTasks.map((task) => (
//               <div
//                 key={task._id}
//                 className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6"
//               >
//                 <div className="flex flex-col lg:flex-row lg:items-start gap-5">
//                   {/* Left: task info */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-start justify-between gap-3 mb-3">
//                       <div className="flex items-center gap-3 min-w-0">
//                         <div className="w-9 h-9 shrink-0 rounded-full bg-green-100 text-green-700 font-semibold flex items-center justify-center text-sm">
//                           {getInitials(task.employee?.name)}
//                         </div>
//                         <div className="min-w-0">
//                           <h3 className="font-semibold text-gray-800 truncate">
//                             {task.taskName}
//                           </h3>
//                           <p className="text-xs text-gray-400">
//                             {task.employee?.name || "Unknown"} •{" "}
//                             {formatDateTime(task.startTime)}
//                           </p>
//                         </div>
//                       </div>

//                       <span
//                         className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium border ${
//                           approvalStyles[task.approvalStatus] ||
//                           "bg-gray-50 text-gray-600 border-gray-200"
//                         }`}
//                       >
//                         {task.approvalStatus}
//                       </span>
//                     </div>

//                     <div className="flex flex-wrap gap-2 mb-3">
//                       <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
//                         {task.taskType}
//                       </span>
//                       <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
//                         {task.department}
//                       </span>
//                       <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
//                         {task.taskCategory}
//                       </span>
//                       <span
//                         className={`px-2 py-1 rounded-md text-xs font-medium ${
//                           statusStyles[task.status] || "bg-gray-100"
//                         }`}
//                       >
//                         {task.status}
//                       </span>
//                     </div>

//                     {task.description && (
//                       <p className="text-sm text-gray-600 mb-3">
//                         {task.description}
//                       </p>
//                     )}

//                     <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-400">
//                       <span>Estimate: {task.estimateTime || 0} hrs</span>
//                       <span>Actual: {task.actualTime || 0} hrs</span>
//                       {task.endTime && (
//                         <span>Ends: {formatDateTime(task.endTime)}</span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Right: action panel */}
//                   <div className="lg:w-72 shrink-0 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-5">
//                     {task.approvalStatus === "Pending" ? (
//                       <div className="space-y-2">
//                         <label className="block text-xs font-medium text-gray-500">
//                           Remark <span className="text-red-500">*</span>
//                         </label>
//                         <textarea
//                           rows={2}
//                           placeholder="Remark likho, jaise 'Good work' ya 'Details missing hai'"
//                           value={remarks[task._id] || ""}
//                           onChange={(e) =>
//                             handleRemarkChange(task._id, e.target.value)
//                           }
//                           className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
//                         />
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleDecision(task._id, "Approved")}
//                             disabled={savingId === task._id}
//                             className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded-lg disabled:opacity-60 transition-colors"
//                           >
//                             {savingId === task._id ? "..." : "Approve"}
//                           </button>
//                           <button
//                             onClick={() => handleDecision(task._id, "Rejected")}
//                             disabled={savingId === task._id}
//                             className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium py-2 rounded-lg disabled:opacity-60 transition-colors"
//                           >
//                             {savingId === task._id ? "..." : "Reject"}
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <div>
//                         <p className="text-xs font-medium text-gray-400 mb-1">
//                           Remark
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           {task.approvalRemark || "-"}
//                         </p>
//                         {task.approvedAt && (
//                           <p className="text-xs text-gray-400 mt-2">
//                             {task.approvalStatus} on{" "}
//                             {formatDateTime(task.approvedAt)}
//                           </p>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Pagination controls - sirf tab dikhao jab 1 se zyada page ho */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-center gap-2 mt-6">
//               <button
//                 onClick={() => goToPage(safePage - 1)}
//                 disabled={safePage === 1}
//                 className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:border-green-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200"
//               >
//                 Prev
//               </button>

//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                 <button
//                   key={page}
//                   onClick={() => goToPage(page)}
//                   className={`w-9 h-9 rounded-lg text-sm font-medium border transition-colors ${
//                     page === safePage
//                       ? "bg-green-600 text-white border-green-600"
//                       : "bg-white text-gray-600 border-gray-200 hover:border-green-300"
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}

//               <button
//                 onClick={() => goToPage(safePage + 1)}
//                 disabled={safePage === totalPages}
//                 className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:border-green-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default TaskApproval;



import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllTasks, approveTask } from "../api/taskApi";
import socket from "../api/Socketclient";

const approvalStyles = {
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Approved: "bg-green-50 text-green-700 border-green-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
};

const statusStyles = {
  Pending: "bg-gray-100 text-gray-600",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Blocked: "bg-red-100 text-red-700",
};

const formatDateTime = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

// Ek page pe kitne task cards dikhane hain
const ITEMS_PER_PAGE = 6;

const TaskApproval = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [remarks, setRemarks] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [filter, setFilter] = useState("Pending");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getAllTasks();
      setTasks(res.data.tasks || res.data);
    } catch (err) {
      // toast.error("Tasks load nahi ho paye");
      toast.error("Failed to load tasks.");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // --- SOCKET.IO: real-time updates ---
  useEffect(() => {
    // HR/manager room join karo, taaki server sirf inhi ko naye task bheje
    // NOTE: apne auth storage ke hisaab se role yahan se nikalo
    // (jaise localStorage me "user" object me role save hota hoga)
    let role = "manager";
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.role) role = storedUser.role;
    } catch {
      // ignore, default "manager" use ho jayega
    }

    socket.emit("join", { role });

    const handleTaskCreated = (newTask) => {
      setTasks((prev) => {
        // Duplicate na ho isliye check kar lo
        if (prev.some((t) => t._id === newTask._id)) return prev;
        return [newTask, ...prev];
      });
      // toast.info(`Naya task aaya: ${newTask.taskName}`);
      toast.info(`A new task has been assigned: ${newTask.taskName}`);
    };

    const handleTaskUpdated = (updatedTask) => {
      setTasks((prev) => {
        const exists = prev.some((t) => t._id === updatedTask._id);
        if (!exists) return prev; // ye task is manager ki list me hai hi nahi
        return prev.map((t) => (t._id === updatedTask._id ? updatedTask : t));
      });
    };

    socket.on("taskCreated", handleTaskCreated);
    socket.on("taskUpdated", handleTaskUpdated);

    return () => {
      socket.off("taskCreated", handleTaskCreated);
      socket.off("taskUpdated", handleTaskUpdated);
    };
  }, []);

  // Filter badalne pe hamesha page 1 pe wapas aa jao
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handleRemarkChange = (taskId, value) => {
    setRemarks((prev) => ({ ...prev, [taskId]: value }));
  };

  const handleDecision = async (taskId, approvalStatus) => {
    const remark = (remarks[taskId] || "").trim();

    if (!remark) {
      // toast.error("Remark likhna zaroori hai");
      toast.error("Please enter a remark.");

      return;
    }

    try {
      setSavingId(taskId);
      await approveTask(taskId, {
        approvalStatus,
        approvalRemark: remark,
      });

      // Backend response shape pe depend nahi karte - jo humne bheja wahi state me update kar dete hain
      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId
            ? {
                ...t,
                approvalStatus,
                approvalRemark: remark,
                approvedAt: new Date().toISOString(),
              }
            : t
        )
      );
      // toast.success(`Task ${approvalStatus.toLowerCase()} ho gaya`);
      toast.success(`Task ${approvalStatus.toLowerCase()} successfully.`);

    } catch (err) {
      // toast.error(err.response?.data?.message || "Kuch galat ho gaya");
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSavingId(null);
    }
  };

  const filteredTasks = tasks.filter((t) =>
    filter === "All" ? true : t.approvalStatus === filter
  );

  const counts = {
    Pending: tasks.filter((t) => t.approvalStatus === "Pending").length,
    Approved: tasks.filter((t) => t.approvalStatus === "Approved").length,
    Rejected: tasks.filter((t) => t.approvalStatus === "Rejected").length,
  };

  // --- Pagination calculations ---
  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Task Approval</h2>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {["Pending", "Approved", "Rejected", "All"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                filter === f
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-green-300"
              }`}
            >
              {f}
              {f !== "All" && counts[f] > 0 && (
                <span className="ml-1.5 text-xs opacity-80">
                  ({counts[f]})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filteredTasks.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center text-gray-400">
          No tasks found for this filter.
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {paginatedTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                  {/* Left: task info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 shrink-0 rounded-full bg-green-100 text-green-700 font-semibold flex items-center justify-center text-sm">
                          {getInitials(task.employee?.name)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-800 truncate">
                            {task.taskName}
                          </h3>
                          <p className="text-xs text-gray-400">
                            {task.employee?.name || "Unknown"} •{" "}
                            {formatDateTime(task.startTime)}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          approvalStyles[task.approvalStatus] ||
                          "bg-gray-50 text-gray-600 border-gray-200"
                        }`}
                      >
                        {task.approvalStatus}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                        {task.taskType}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                        {task.department}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                        {task.taskCategory}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          statusStyles[task.status] || "bg-gray-100"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>

                    {task.description && (
                      <p className="text-sm text-gray-600 mb-3">
                        {task.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-400">
                      <span>Estimate: {task.estimateTime || 0} hrs</span>
                      <span>Actual: {task.actualTime || 0} hrs</span>
                      {task.endTime && (
                        <span>Ends: {formatDateTime(task.endTime)}</span>
                      )}
                    </div>
                  </div>

                  {/* Right: action panel */}
                  <div className="lg:w-72 shrink-0 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-5">
                    {task.approvalStatus === "Pending" ? (
                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-500">
                          Remark <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Remark likho, jaise 'Good work' ya 'Details missing hai'"
                          value={remarks[task._id] || ""}
                          onChange={(e) =>
                            handleRemarkChange(task._id, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDecision(task._id, "Approved")}
                            disabled={savingId === task._id}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded-lg disabled:opacity-60 transition-colors"
                          >
                            {savingId === task._id ? "..." : "Approve"}
                          </button>
                          <button
                            onClick={() => handleDecision(task._id, "Rejected")}
                            disabled={savingId === task._id}
                            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium py-2 rounded-lg disabled:opacity-60 transition-colors"
                          >
                            {savingId === task._id ? "..." : "Reject"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs font-medium text-gray-400 mb-1">
                          Remark
                        </p>
                        <p className="text-sm text-gray-600">
                          {task.approvalRemark || "-"}
                        </p>
                        {task.approvedAt && (
                          <p className="text-xs text-gray-400 mt-2">
                            {task.approvalStatus} on{" "}
                            {formatDateTime(task.approvedAt)}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls - sirf tab dikhao jab 1 se zyada page ho */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
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

export default TaskApproval;