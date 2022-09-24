import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  const outh = localStorage.getItem("token");
  return outh ? <Outlet /> : <Navigate to="sign-up" />;
};

export default PrivateComponent;
