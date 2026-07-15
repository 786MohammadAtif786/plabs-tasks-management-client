import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProfile, deleteAccount } from "../api/UserApi";
import { useAuth } from "../context/AuthContext"; // apna existing AuthContext path daal dena

const Settings = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState("account");

  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.avatar || "");
  const [saving, setSaving] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      // toast.error("Sirf image file upload kar sakte ho");
      toast.error("Only image files are allowed.");

      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      // toast.error("Image 5MB se badi nahi honi chahiye");
      toast.error("Image size must not exceed 5 MB.");
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (password || confirmPassword) {
      if (password.length < 6) {
        // toast.error("Password kam se kam 6 digit ka hona chahiye");
        toast.error("Password must be at least 6 characters long.");

        return;
      }
      if (password !== confirmPassword) {
        // toast.error("Password match nahi ho raha");
        toast.error("Passwords do not match.");

        return;
      }
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("name", name);
      if (password) {
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);
      }
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await updateProfile(formData);
      const updatedUser = res.data.user;

      // Context aur localStorage me updated info save karo (token same rehta hai)
      login(updatedUser, localStorage.getItem("token"));

      toast.success("Profile updated successfully");
      setPassword("");
      setConfirmPassword("");
      setImageFile(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update nahi ho paya");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "This account will be permanently deleted. This action cannot be undone. Are you sure you want to continue?"
    );
    if (!confirmed) return;

    try {
      setDeleteLoading(true);
      await deleteAccount();
      toast.success("Account deleted");
      logout();
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete nahi ho paya");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mb-4"
      >
        ← Back
      </Link>

      {/* Tabs */}
      <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("account")}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            activeTab === "account"
              ? "bg-teal-700 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          👤 Account
        </button>
        <button
          onClick={() => setActiveTab("danger")}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            activeTab === "danger"
              ? "bg-red-600 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          ⚠️ Danger Zone
        </button>
      </div>

      {activeTab === "account" ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Account Settings
          </h2>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Avatar */}
            <div className="flex flex-col items-center mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-3 border border-gray-200">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    No image
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">
                Email change nahi kiya ja sakta
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password (optional)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password (optional)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-red-600 mb-2">Danger Zone</h2>
          <p className="text-sm text-gray-500 mb-6">
            {/* Account delete karne ke baad saara data permanently delete ho
            jayega. Ye action wapas nahi kiya ja sakta. */}
            Deleting your account will permanently remove all your data. This action cannot be undone.
          </p>
          <button
            onClick={handleDeleteAccount}
            disabled={deleteLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60"
          >
            {deleteLoading ? "Deleting..." : "Delete My Account"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;