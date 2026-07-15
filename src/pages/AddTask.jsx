// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { createTask } from "../api/taskApi";

// const TASK_TYPES = ["Task", "Break", "Research", "Feature", "Meeting", "Bug"];
// const DEPARTMENTS = ["Frontend", "Backend", "Design", "DevOps", "QA", "Other"];
// const CATEGORIES = [
//   "Other",
//   "Debugging",
//   "Research",
//   "Feature",
//   "Development",
//   "Testing",
// ];
// const STATUSES = ["Pending", "In Progress", "Completed", "Blocked"];

// const initialState = {
//   taskName: "",
//   taskType: "Task",
//   department: "Other",
//   taskCategory: "Other",
//   uiElementType: "",
//   description: "",
//   estimateTime: "",
//   actualTime: "",
//   startTime: "",
//   endTime: "",
//   status: "Pending",
// };

// const AddTask = () => {
//   const [formData, setFormData] = useState(initialState);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.taskName.trim()) {
//       toast.error("Task name is required");
//       return;
//     }
//     if (!formData.startTime) {
//       toast.error("Start time is required");
//       return;
//     }

//     try {
//       setLoading(true);
//       await createTask({
//         ...formData,
//         estimateTime: Number(formData.estimateTime) || 0,
//         actualTime: Number(formData.actualTime) || 0,
//       });
//       toast.success("Task added successfully");
//       navigate("/my-tasks");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Task add nahi ho paya");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <div className="bg-white rounded-2xl shadow-md p-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Task</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Task Name
//             </label>
//             <input
//               type="text"
//               name="taskName"
//               required
//               value={formData.taskName}
//               onChange={handleChange}
//               placeholder="e.g. Share Event is Not Working"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Task Type
//               </label>
//               <select
//                 name="taskType"
//                 value={formData.taskType}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               >
//                 {TASK_TYPES.map((t) => (
//                   <option key={t} value={t}>
//                     {t}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Department
//               </label>
//               <select
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               >
//                 {DEPARTMENTS.map((d) => (
//                   <option key={d} value={d}>
//                     {d}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Task Category
//               </label>
//               <select
//                 name="taskCategory"
//                 value={formData.taskCategory}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               >
//                 {CATEGORIES.map((c) => (
//                   <option key={c} value={c}>
//                     {c}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 UI Element Type / Integration
//               </label>
//               <input
//                 type="text"
//                 name="uiElementType"
//                 value={formData.uiElementType}
//                 onChange={handleChange}
//                 placeholder="e.g. Component, API"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Detail
//             </label>
//             <textarea
//               name="description"
//               rows={4}
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Kya kaam kiya, detail me likho"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Estimate Time (hrs)
//               </label>
//               <input
//                 type="number"
//                 step="0.5"
//                 name="estimateTime"
//                 value={formData.estimateTime}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Actual Time (hrs)
//               </label>
//               <input
//                 type="number"
//                 step="0.5"
//                 name="actualTime"
//                 value={formData.actualTime}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Start Time
//               </label>
//               <input
//                 type="datetime-local"
//                 name="startTime"
//                 required
//                 value={formData.startTime}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 End Time
//               </label>
//               <input
//                 type="datetime-local"
//                 name="endTime"
//                 value={formData.endTime}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Status
//             </label>
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             >
//               {STATUSES.map((s) => (
//                 <option key={s} value={s}>
//                   {s}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60"
//           >
//             {loading ? "Adding..." : "Add Task"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddTask;



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { createTask } from "../api/taskApi";

// const TASK_TYPES = ["Task", "Break", "Research", "Feature", "Meeting", "Bug"];
// const DEPARTMENTS = ["Frontend", "Backend", "Design", "DevOps", "QA", "Other"];
// const CATEGORIES = [
//   "Other",
//   "Debugging",
//   "Research",
//   "Feature",
//   "Development",
//   "Testing",
// ];
// const STATUSES = ["Pending", "In Progress", "Completed", "Blocked"];

// const initialState = {
//   taskName: "",
//   taskType: "Task",
//   department: "Other",
//   taskCategory: "Other",
//   uiElementType: "",
//   description: "",
//   estimateTime: "",
//   actualTime: "",
//   startTime: "",
//   endTime: "",
//   status: "Pending",
// };

// // Current local datetime in "YYYY-MM-DDTHH:mm" format (for datetime-local min attr)
// const getNowLocalDateTime = () => {
//   const now = new Date();
//   const offset = now.getTimezoneOffset();
//   const local = new Date(now.getTime() - offset * 60 * 1000);
//   return local.toISOString().slice(0, 16);
// };

// const AddTask = () => {
//   const [formData, setFormData] = useState(initialState);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const minStartTime = getNowLocalDateTime();

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Estimate/Actual time: negative allow mat karo
//     if (name === "estimateTime" || name === "actualTime") {
//       if (value !== "" && Number(value) < 0) {
//         return; // negative value ignore kar do
//       }
//     }

//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.taskName.trim()) {
//       toast.error("Task name is required");
//       return;
//     }
//     if (!formData.startTime) {
//       toast.error("Start time is required");
//       return;
//     }

//     // Estimate/Actual time negative na ho
//     if (Number(formData.estimateTime) < 0 || Number(formData.actualTime) < 0) {
//       toast.error("Estimate/Actual time negative nahi ho sakta");
//       return;
//     }

//     // Start time aaj/abhi se peeche na ho
//     if (new Date(formData.startTime) < new Date(minStartTime)) {
//       toast.error("Start time aaj se peeche nahi ja sakta");
//       return;
//     }

//     // End time, start time se aage hi hona chahiye
//     if (
//       formData.endTime &&
//       new Date(formData.endTime) <= new Date(formData.startTime)
//     ) {
//       toast.error("End time, start time se aage hona chahiye");
//       return;
//     }

//     try {
//       setLoading(true);
//       await createTask({
//         ...formData,
//         estimateTime: Number(formData.estimateTime) || 0,
//         actualTime: Number(formData.actualTime) || 0,
//       });
//       toast.success("Task added successfully");
//       navigate("/my-tasks");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Task add nahi ho paya");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <div className="bg-white rounded-2xl shadow-md p-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Task</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Task Name
//             </label>
//             <input
//               type="text"
//               name="taskName"
//               required
//               value={formData.taskName}
//               onChange={handleChange}
//               placeholder="e.g. Share Event is Not Working"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Task Type
//               </label>
//               <select
//                 name="taskType"
//                 value={formData.taskType}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               >
//                 {TASK_TYPES.map((t) => (
//                   <option key={t} value={t}>
//                     {t}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Department
//               </label>
//               <select
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               >
//                 {DEPARTMENTS.map((d) => (
//                   <option key={d} value={d}>
//                     {d}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Task Category
//               </label>
//               <select
//                 name="taskCategory"
//                 value={formData.taskCategory}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               >
//                 {CATEGORIES.map((c) => (
//                   <option key={c} value={c}>
//                     {c}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 UI Element Type / Integration
//               </label>
//               <input
//                 type="text"
//                 name="uiElementType"
//                 value={formData.uiElementType}
//                 onChange={handleChange}
//                 placeholder="e.g. Component, API"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Detail
//             </label>
//             <textarea
//               name="description"
//               rows={4}
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="please add task details"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Estimate Time (hrs)
//               </label>
//               <input
//                 type="number"
//                 step="0.5"
//                 min="0"
//                 name="estimateTime"
//                 value={formData.estimateTime}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Actual Time (hrs)
//               </label>
//               <input
//                 type="number"
//                 step="0.5"
//                 min="0"
//                 name="actualTime"
//                 value={formData.actualTime}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Start Time
//               </label>
//               <input
//                 type="datetime-local"
//                 name="startTime"
//                 required
//                 min={minStartTime}
//                 value={formData.startTime}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 End Time
//               </label>
//               <input
//                 type="datetime-local"
//                 name="endTime"
//                 min={formData.startTime || minStartTime}
//                 value={formData.endTime}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Status
//             </label>
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             >
//               {STATUSES.map((s) => (
//                 <option key={s} value={s}>
//                   {s}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60"
//           >
//             {loading ? "Adding..." : "Add Task"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddTask;




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTask } from "../api/taskApi";

const TASK_TYPES = ["Task", "Break", "Research", "Feature", "Meeting", "Bug"];
const DEPARTMENTS = ["Frontend", "Backend", "Design", "DevOps", "QA", "Other"];
const CATEGORIES = [
  "Other",
  "Debugging",
  "Research",
  "Feature",
  "Development",
  "Testing",
];
const STATUSES = ["Pending", "In Progress", "Completed", "Blocked"];

const initialState = {
  taskName: "",
  taskType: "Task",
  department: "Other",
  taskCategory: "Other",
  uiElementType: "",
  description: "",
  estimateTime: "",
  actualTime: "",
  startTime: "",
  endTime: "",
  status: "Pending",
};

// Current local datetime in "YYYY-MM-DDTHH:mm" format (for datetime-local min attr)
const getNowLocalDateTime = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
};

const AddTask = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const minStartTime = getNowLocalDateTime();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Estimate/Actual time: negative allow mat karo
    if (name === "estimateTime" || name === "actualTime") {
      if (value !== "" && Number(value) < 0) {
        return; // negative value ignore kar do
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.taskName.trim()) {
      toast.error("Task name is required");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Task details are required");
      return;
    }

    if (!formData.startTime) {
      toast.error("Start time is required");
      return;
    }

    if (!formData.endTime) {
      toast.error("End time is required");
      return;
    }

    // Estimate/Actual time negative na ho
    if (Number(formData.estimateTime) < 0 || Number(formData.actualTime) < 0) {
      toast.error("Estimate/Actual time negative nahi ho sakta");
      return;
    }

    // Start time aaj/abhi se peeche na ho
    if (new Date(formData.startTime) < new Date(minStartTime)) {
      toast.error("Start time aaj se peeche nahi ja sakta");
      return;
    }

    // End time, start time se aage hi hona chahiye
    if (
      formData.endTime &&
      new Date(formData.endTime) <= new Date(formData.startTime)
    ) {
      toast.error("End time, start time se aage hona chahiye");
      return;
    }

    try {
      setLoading(true);
      await createTask({
        ...formData,
        estimateTime: Number(formData.estimateTime) || 0,
        actualTime: Number(formData.actualTime) || 0,
      });
      toast.success("Task added successfully");
      navigate("/my-tasks");
    } catch (err) {
      toast.error(err.response?.data?.message || "Task add nahi ho paya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Task</h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Name
            </label>
            <input
              type="text"
              name="taskName"
              value={formData.taskName}
              onChange={handleChange}
              placeholder="e.g. Share Event is Not Working"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Type
              </label>
              <select
                name="taskType"
                value={formData.taskType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {TASK_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Category
              </label>
              <select
                name="taskCategory"
                value={formData.taskCategory}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                UI Element Type / Integration
              </label>
              <input
                type="text"
                name="uiElementType"
                value={formData.uiElementType}
                onChange={handleChange}
                placeholder="e.g. Component, API"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Detail
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="please add task details"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimate Time (hrs)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                name="estimateTime"
                value={formData.estimateTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Actual Time (hrs)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                name="actualTime"
                value={formData.actualTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="datetime-local"
                name="startTime"
                min={minStartTime}
                value={formData.startTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="datetime-local"
                name="endTime"
                min={formData.startTime || minStartTime}
                value={formData.endTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;