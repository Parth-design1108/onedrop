import { Navigate } from "react-router-dom";  // Used for redirecting users to another route
import { useSelector } from "react-redux";    // Used to access Redux state (user data)

const PrivateRoute = ({children}) => {

  // Get user data from Redux store
  const user = useSelector((state) => state.user);
  const userData = user?.currentUser;  // Extract current logged-in user details (if any)

  // If user is not logged in
  if (!userData) {
    // Redirect user to sign-in page
    // "replace" ensures the sign-in page replaces current history entry
    return <Navigate to="/sign-in" replace />;
  }

  // If user is logged in, render the protected page/component
  return children;
};

export default PrivateRoute;  // Exporting PrivateRoute to use in routing configuration
