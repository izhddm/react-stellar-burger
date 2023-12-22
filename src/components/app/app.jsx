import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "../../pages/home-page/home-page";
import NotFoundPage from "../../pages/not-found-page/not-found-page";

function App() {
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<AppHeader/>}>
            <Route index element={<HomePage/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
