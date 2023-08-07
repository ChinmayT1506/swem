import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRouter() {
    const isloggedIn = localStorage.getItem("accessToken");

    return <> {!isloggedIn ? <Outlet /> : <Navigate to="/dashboard" />}</>;
  }