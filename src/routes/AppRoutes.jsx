import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { routes } from "./RoutesConfig.jsx";
import Loading from "@/components/Loading";

const ProtectedRoute = ({ element, privateRoute, allowedRoles, title }) => {
  const { isLoggedIn, user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  if (loading) {
    return <Loading />;
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
    {routes.map(
      ({ path, element, private: privateRoute, allowedRoles, title }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute
              element={element}
              privateRoute={privateRoute}
              allowedRoles={allowedRoles}
              title={title}
            />
          }
        />
      )
    )}
  </Routes>
);

export default AppRoutes;
