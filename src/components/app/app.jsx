import React, {useEffect} from "react";
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
import IngredientsPage from "../../pages/ingredients-page/ingredients-page";
import {useDispatch} from "react-redux";
import {setLoggedIn} from "../../services/slices/user-slice";
import {useRefreshTokenMutation} from "../../services/api/apiBase";
import {isJwtTokenValid} from "../../utils/jwtUtils";

function App() {
  const dispatch = useDispatch();
  const [updateToken, {isLoading: isLoadingToken, isError: isErrorToken}] = useRefreshTokenMutation();

  // При монтировании актуализируем данные по логину пользователя
  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    const checkTokenValidity = async () => {
      // Декодирование токена без проверки подписи
      const valid = isJwtTokenValid(accessToken);

      // Проверка времени истечения токена
      if (valid) {
        dispatch(setLoggedIn({'isLoggedIn': true}));
      } else if (refreshToken) {
        try {
          // Дождитесь выполнения updateToken
          const response = updateToken(refreshToken);
          const {data} = await response;

          if (data?.success) {
            dispatch(setLoggedIn({'isLoggedIn': true}));
          }
        } catch (error) {
          console.error('Ошибка при обновлении токена:', error.message);
        }
      }
    };

    // Вызываем функцию с использованием async/await
    checkTokenValidity();
  }, [dispatch, updateToken]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path={'/ingredients/:id'} element={<IngredientsPage/>}/>

          // Для не авторизированных только
          <Route element={<ProtectedRouter anonymous={true}/>}>
            <Route path={'/register'} element={<RegisterPage/>}/>
            <Route path={'/forgot-password'} element={<ForgotPasswordPage/>}/>
            <Route path={'/reset-password'} element={<ResetPasswordPage/>}/>
            <Route path={'/login'} element={<LoginPage/>}/>
          </Route>


          {/*Только для авторизированных*/}
          <Route path={'/profile'} element={<ProtectedRouter/>}>
            <Route element={<ProfilePage/>}>
              <Route index element={<ProfileEditForm/>}/>
              <Route path={'orders'} element={<NotFoundPage/>}/>
            </Route>
          </Route>

          <Route path='*' element={<NotFoundPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
