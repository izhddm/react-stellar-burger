import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "../../pages/home-page/home-page";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
import Layout from "../layout/layout";
import LoginPage from "../../pages/login-page/login-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import RegisterPage from "../../pages/register-page/register-page";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import ProfileEditForm from "../form/profile-edit-form/profile-edit-form";
import ProtectedRouter from "../protected-router/protected-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path={'/register'} element={<RegisterPage/>}/>
          <Route path={'/forgot-password'} element={<ForgotPasswordPage/>}/>
          <Route path={'/reset-password'} element={<ResetPasswordPage/>}/>

          {/*Только для авторизированных*/}
          <Route path={'/profile'} element={<ProtectedRouter/>}>
            <Route element={<ProfilePage/>}>
              <Route index element={<ProfileEditForm/>}/>
              <Route path={'orders'} element={<NotFoundPage/>}/>
            </Route>
          </Route>

          <Route path={'/login'} element={<LoginPage/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
