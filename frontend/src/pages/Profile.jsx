import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  signOutFailure,
  signOutSuccess,
  userDeleteFailure,
  userDeleteSuccess,
} from "../features/userSlice.js";
import { useNavigate } from "react-router-dom";
useEffect(()=>{
},[userData]);
// Function to handle user sign-out
// Function to handle user sign-out
const handleSignOut = async () => {
  try {
    // Make a POST request to the backend sign-out API
    const res = await fetch("/api/auth/sign-out", {
      method: "POST",
    });

    console.log("res", res); // Log the response for debugging

    // If the response is not OK, dispatch failure action
    if (!res.ok) {
      dispatch(signOutFailure("Sign out failed!!"));
      return;
    }

    // If sign-out succeeds, show alert, dispatch success action, and navigate to home page
    alert("Sign-out successful");
    dispatch(signOutSuccess());
    navigate("/");
  } catch (error) {
    // Handle any unexpected error (network/server issue)
    dispatch(signOutFailure(error));
  }
};

// Function to handle user account deletion
// Function to handle user account deletion
const handleDelete = async () => {
  try {
    // Send DELETE request to the backend delete-user API
    const res = await fetch("/api/user/delete-user", {
      method: "DELETE",
    });

    console.log("res", res); // Log API response for debugging

    // If the request fails, show alert and dispatch failure action
    if (!res.ok) {
      alert("User deletion failed!!");
      dispatch(userDeleteFailure("User deletion failed!!"));
      return;
    }

    // If request succeeds, show success alert, dispatch success action, and navigate to home page
    alert("User deleted successfully");
    dispatch(userDeleteSuccess());
    navigate("/");
  } catch (error) {
    // Handle unexpected errors (e.g., network/server issues)
    dispatch(userDeleteFailure(error));
  }
};


// Profile component displays the current user's profile information
function Profile() {
  // Get user state from Redux store
  const user = useSelector((state) => state.user);

  // Local state for user details
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState(null);

  // Extract currentUser from user state
  const userData = user?.currentUser;

  // Update local state when userData changes
  useEffect(() => {
    if (userData) {
      setUserName(userData.userName);
      setEmail(userData.email);
      setUserImage(userData.userImage);
    }
  }, [userData]);
return (
  // Main container for profile page
  <div className="flex flex-col justify-center items-center min-h-screen bg-gray-300 px-4">
    {userData ? (
      // Profile card
      <div className="bg-cyan-400 rounded-2xl p-6 sm:p-10 w-full max-w-md text-center lg:w-160 lg:h-150">
        {/* User profile image */}
        <img
          src={userImage}
          alt={userName}
          className="w-50 h-50 sm:w-40 sm:h-40 lg:w-80 lg:h-80 rounded-full mx-auto mb-6 border-4 border-gray-200 object-cover"
        />

        {/* User name */}
        <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-800 mb-2 border-1 p-1 rounded-2xl bg-white">
          {userName}
        </h1>

        {/* User email */}
        <p className="text-gray-600 text-base sm:text-lg break-words mb-6 lg:text-2xl border-1 p-2 rounded-2xl bg-white">
          {email}
        </p>
        {/* Action Buttons */}
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
      // Loading state
      <p className="text-gray-500 text-lg">Loading profile...</p>
    )}
  </div>
);
}
// Export Profile component
export default Profile;
