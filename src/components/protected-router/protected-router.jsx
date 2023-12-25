import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRouter({ forAuthenticated, forUnauthenticated }) {
  const auth = localStorage.getItem('accessToken');

  console.log(forAuthenticated, forUnauthenticated)

  if (forAuthenticated && !auth) {
    // Перенаправляем на /login для неавторизованных пользователей
    return <Navigate to="/login" />;
  }

  if (forUnauthenticated && auth) {
    // Перенаправляем на /profile для авторизованных пользователей
    return <Navigate to="/profile" />;
  }

  return <Outlet />;
}

export default ProtectedRouter;
