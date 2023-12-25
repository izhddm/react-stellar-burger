import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

function ProtectedRouter() {
  const auth = localStorage.getItem('accessToken');

  return (
    auth ? <Outlet/> : <Navigate to={'/login'}/>
  );
}

export default ProtectedRouter;
