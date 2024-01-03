import React, {FC, useEffect} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
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
import {useDispatch} from "react-redux";
import {setLoggedIn, setUser} from "../../services/slices/user-slice";
import {useRefreshTokenMutation} from "../../services/api/apiBase";
import {isJwtTokenValid} from "../../utils/jwtUtils";
import {useGetIngredientsQuery} from "../../services/api/ingredient-api";
import {setIngredients} from "../../services/slices/ingredients-slice";
import styles from './app.module.css'
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useGetUserInfoQuery} from "../../services/api/user-api";

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state?.background;

  const [updateToken, {isLoading: isLoadingToken, isError: isErrorToken}] = useRefreshTokenMutation(); // Обновление токена
  const {data: ingredients, isLoading: ingredientLoading, isError: ingredientError} = useGetIngredientsQuery(); // Получения списка ингредиентов
  const {data: userInfo, isLoading: isLoadingUserInfo} = useGetUserInfoQuery(); // Получение данных о юзере

  // При монтировании запишем данные о пользователе
  useEffect(() => {
    if (userInfo?.success) {
      dispatch(setUser(userInfo.user));
    }
  }, [userInfo]);

  // При монтировании получим список ингредиентов
  useEffect(() => {
    if (!ingredientLoading) {
      dispatch(setIngredients(ingredients?.data ?? []));
    }
  }, [ingredients, ingredientLoading]);

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
          const response = updateToken(refreshToken);
          const {data} = await response;

          if (data?.success) {
            dispatch(setLoggedIn({'isLoggedIn': true}));
          }
        } catch (error: any) {
          console.error('Ошибка при обновлении токена:', error.message);
        }
      }
    };

    // Вызываем функцию с использованием async/await
    checkTokenValidity();
  }, [dispatch, updateToken]);

  // Выведем прелоудер пока идет загрузка
  if (isLoadingToken || ingredientLoading || isLoadingUserInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Routes location={background || location}>
        <Route path={'/'} element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path={'/ingredients/:id'} element={<IngredientDetails/>}/>

          // Для не авторизированных только
          <Route element={<ProtectedRouter anonymous={true}/>}>
            <Route path={'/register'} element={<RegisterPage/>}/>
            <Route path={'/forgot-password'} element={<ForgotPasswordPage/>}/>
            <Route path={'/reset-password'} element={<ResetPasswordPage/>}/>
            <Route path={'/login'} element={<LoginPage/>}/>
          </Route>


          // Только для авторизированных
          <Route element={<ProtectedRouter/>}>
            <Route path={'/profile'} element={<ProfilePage/>}>
              <Route index element={<ProfileEditForm/>}/>
              <Route path={'orders'} element={<NotFoundPage/>}/>
            </Route>
          </Route>

          <Route path='*' element={<NotFoundPage/>}/>
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path={'ingredients/:id'} element={<Modal componentName={'IngredientDetails'}/>}/>
        </Routes>
      )}
    </div>
  );
}

export default App;
