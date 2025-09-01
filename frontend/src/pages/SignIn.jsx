import { useState } from "react";

import { useNavigate } from "react-router-dom";
// For programmatic navigation

import { useDispatch } from "react-redux";
// For dispatching Redux actions

import { signInFailure, signInSuccess } from "../features/userSlice.js";
// Redux actions for user authentication state


function SignIn() {
  // Local state for form inputs
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // To redirect after successful login
  const dispatch = useDispatch(); // To dispatch Redux actions


  // Function to handle form submission
  const handleForm = async (e) => {
    try {
      e.preventDefault(); // Prevent default form submission (page reload)

      // Validate if username and email fields are filled
      if (!userName || !email) {
        dispatch(signInFailure("All details required"));
        return;
      }

      // Validate password length
      if (password.length < 6) {
        dispatch(signInFailure("Password must be at least 6 characters long."));
        return;
      }

      // Prepare data object for API request
      const data = { userName, email, password };
      // Send POST request to backend API for sign-in
const res = await fetch("/api/auth/sign-in", {
  method: "POST",
  headers: {
    "Content-Type": "application/json", // Sending JSON data
  },
  body: JSON.stringify(data), // Convert JS object to JSON string
});

// Handle error if response is not successful
if (!res.ok) {
  dispatch(signInFailure("error while getting response"));
  return;
}

// Convert API response to JSON
const result = await res.json();

// Dispatch success action with logged-in user data
dispatch(signInSuccess(result?.data?.loggedInUser));

// Show success alert and navigate to profile page
alert("User login successfully!!!");
navigate("/profile");
} catch (error) {
  // Handle unexpected errors
  console.log(error);
  alert("User Sign In process Failed !!");
}
};
return (
  <div className="min-h-screen flex items-center justify-center bg-gray-300 p-4">
    {/* Sign In form container */}
    <form
      className="bg-white p-4 sm:p-6 space-y-3 sm:space-y-4 border-2 rounded-2xl text-sm text-base md:text-lg lg:text-3xl w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl"
      onSubmit={handleForm}
    >
      {/* Form Heading */}
      <h2 className="font-bold text-center text-base sm:text-lg md:text-xl lg:text-2xl">
        Sign In
      </h2>

      {/* Username Input */}
      <input
        type="text"
        name="userName"
        placeholder="Enter username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)} // Update username state
        className="w-full p-2 sm:p-3 md:p-4 border rounded text-sm sm:text-base md:text-lg lg:text-xl"
        required
      />

      {/* Email Input */}
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Update email state
        className="w-full p-2 sm:p-3 md:p-4 border rounded text-sm sm:text-base md:text-lg lg:text-xl"
        required
      />

      {/* Password Input */}
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Update password state
        className="w-full p-2 sm:p-3 md:p-4 border rounded text-sm sm:text-base md:text-lg lg:text-xl"
        required
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-1 sm:py-2 md:py-3 rounded hover:bg-blue-600 text-sm sm:text-base md:text-lg lg:text-xl"
      >
        Sign In
      </button>
    </form>
  </div>
);
}
export default SignIn;