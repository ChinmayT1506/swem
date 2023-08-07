import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import MainLayout from "../app/layouts/mainLayout/mainLayout";

export default function PrivateRouter() {
    const isloggedIn = localStorage.getItem("accessToken");
    return (
        <>
            {isloggedIn ? (
                <MainLayout>
                    <Outlet/>
                </MainLayout>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
}








