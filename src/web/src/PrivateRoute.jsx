import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = () => {
  const { householdName /*user*/ } = useAuth();

  if(!householdName/*user*/) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;