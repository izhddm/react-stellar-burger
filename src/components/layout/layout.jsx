import React from 'react';
import {Outlet} from "react-router-dom";
import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";

function Layout() {
  return (
    <>
      <AppHeader/>
      <Outlet/>
      <Modal/>
    </>
  );
}

export default Layout;
