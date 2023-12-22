import React from 'react';
import {Outlet} from "react-router-dom";
import Modal from "../modal/modal";
import AppHeader from "../app-header/app-header";
import styles from "./layout.module.css"

function Layout() {
  return (
    <div className={styles.container}>
      <AppHeader/>
      <Outlet/>
      <Modal/>
    </div>
  );
}

export default Layout;
