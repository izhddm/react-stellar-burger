import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "../../pages/home-page/home-page";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
import Layout from "../layout/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
