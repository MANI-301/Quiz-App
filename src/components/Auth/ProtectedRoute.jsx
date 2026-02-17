import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();

  // Get current user from sessionStorage
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "null");

  // 1️⃣ If no user is logged in → redirect to login page
  if (!currentUser) {
    const loginPath = allowedRoles?.includes("admin") ? "/admin/login" : "/";
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  // 2️⃣ If logged in but user role is not allowed → redirect to their default page
  if (!allowedRoles.includes(currentUser.role)) {
    if (currentUser.role === "student") return <Navigate to="/voucher" replace />;
    if (currentUser.role === "admin") return <Navigate to="/admin/dashboard" replace />;

    // Fallback
    return <Navigate to="/" replace />;
  }

  // 3️⃣ Authorized → render child routes
  return <Outlet />;
};

export default ProtectedRoute;
