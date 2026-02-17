import { Navigate, Outlet, useLocation } from "react-router-dom";

var ProtectedRoute = function ({ allowedRoles }) {
  var location = useLocation(); // 1. Get the current URL the user is trying to access
  var currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "null");

  // 2. Check if user is NOT logged in
  if (!currentUser) {
    // Redirect to Login, but save the intended location in 'state'
    // so we can redirect them back after they login.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 3. Check if user exists but has the WRONG role
  if (!allowedRoles.includes(currentUser.role)) {
    // If a Student tries to access Admin pages
    if (currentUser.role === "student") {
      return <Navigate to="/voucher" replace />;
    }
    
    // If an Admin tries to access Student pages
    if (currentUser.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    // Fallback
    return <Navigate to="/" replace />;
  }

  // 4. Authorized
  return <Outlet />;
};

export default ProtectedRoute;