import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  signOutFailure,
  signOutSuccess,
  userDeleteFailure,
  userDeleteSuccess,
} from "../features/userSlice.js";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user state from Redux store
  const user = useSelector((state) => state.user); // adjust if your state shape differs
  const userData = user?.currentUser;

  // Local state for user details
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState(null);

  // Update local state when userData changes
  useEffect(() => {
    if (userData) {
      setUserName(userData.userName || "");
      setEmail(userData.email || "");
      setUserImage(userData.userImage || null);
    }
  }, [userData]);

  // Function to handle user sign-out
  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/sign-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // include credentials if your API needs cookies:
        // credentials: "include"
      });

      if (!res.ok) {
        // try to read server message if available
        const err = await res.text().catch(() => "Sign out failed");
        dispatch(signOutFailure(err));
        alert("Sign out failed");
        return;
      }

      dispatch(signOutSuccess());
      alert("Sign-out successful");
      navigate("/");
    } catch (error) {
      dispatch(signOutFailure(error.toString()));
      console.error("Sign-out error:", error);
      alert("Network error while signing out");
    }
  };

  // Function to handle user account deletion
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      const res = await fetch("/api/user/delete-user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        // credentials: "include" // if needed
      });

      if (!res.ok) {
        const err = await res.text().catch(() => "User deletion failed");
        dispatch(userDeleteFailure(err));
        alert("User deletion failed");
        return;
      }

      dispatch(userDeleteSuccess());
      alert("User deleted successfully");
      navigate("/");
    } catch (error) {
      dispatch(userDeleteFailure(error.toString()));
      console.error("Delete error:", error);
      alert("Network error while deleting user");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-300 px-4">
      {userData ? (
        <div className="bg-cyan-400 rounded-2xl p-6 sm:p-10 w-full max-w-md text-center lg:w-160 lg:h-150">
          <img
            src={userImage}
            alt={userName}
            className="w-50 h-50 sm:w-40 sm:h-40 lg:w-80 lg:h-80 rounded-full mx-auto mb-6 border-4 border-gray-200 object-cover"
          />

          <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-800 mb-2 border-1 p-1 rounded-2xl bg-white">
            {userName}
          </h1>

          <p className="text-gray-600 text-base sm:text-lg break-words mb-6 lg:text-2xl border-1 p-2 rounded-2xl bg-white">
            {email}
          </p>

          <div className="flex justify-center gap-4">
            <button
              className="px-5 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="px-5 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-lg">Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
