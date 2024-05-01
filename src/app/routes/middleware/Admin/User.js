import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const UserMiddleware = ({ fallbackPath }) => {
    let roleArray = [];
    let Role = JSON.parse(localStorage.getItem('user'))
    roleArray.push(Role.role)
    const isRouter = roleArray.includes('User')
    return isRouter ? <Outlet /> : <Navigate to={fallbackPath} />;
};

export default UserMiddleware;