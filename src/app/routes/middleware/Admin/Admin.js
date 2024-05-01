import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const AdminMiddleware = ({ fallbackPath }) => {
    let roleArray = [];
    let Role = JSON.parse(localStorage.getItem('user'))
    roleArray.push(Role.role)
    const isRouter = roleArray.includes('Admin')
    return isRouter ? <Outlet /> : <Navigate to={fallbackPath} />;
};

export default AdminMiddleware;