import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { routes } from "./routesConfig.jsx";

const ProtectedRoute = ({ element, privateRoute, allowedRoles }) => {
  const { isLoggedIn, user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (privateRoute) {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return element;
};

const AppRoutes = () => (
  <Routes>
    {routes.map(({ path, element, private: privateRoute, allowedRoles }) => (
      <Route
        key={path}
        path={path}
        element={
          <ProtectedRoute
            element={element}
            privateRoute={privateRoute}
            allowedRoles={allowedRoles}
          />
        }
      />
    ))}
  </Routes>
);

export default AppRoutes;
