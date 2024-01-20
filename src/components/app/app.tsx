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
import ProtectedRouter from "../protected-router/protected-router";
import {setLoggedIn, setUser} from "../../services/slices/user-slice";
import {useRefreshTokenMutation} from "../../services/api/api-base";
import {isJwtTokenValid} from "../../utils/jwtUtils";
import {useGetIngredientsQuery} from "../../services/api/ingredient-api";
import styles from './app.module.css'
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useGetUserInfoQuery} from "../../services/api/user-api";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {ProfileOrderPage} from "../../pages/profile-order-page/profile-order-page";
import {FeedPage} from "../../pages/feed-page/feed-page";
import {OrderInfo} from "../order-info/order-info";
import {ProfileEditPage} from "../../pages/profile-edit-page/profile-edit-page";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state && location.state?.background;

  const [updateToken, {isLoading: isLoadingToken, isError: isErrorToken}] = useRefreshTokenMutation(); // Обновление токена
  const {isLoading: isLoadingIngredients} = useGetIngredientsQuery(); // Получения списка ингредиентов
  const {data: userInfo, isLoading: isLoadingUserInfo} = useGetUserInfoQuery(); // Получение данных о юзере

  // При монтировании запишем данные о пользователе
  useEffect(() => {
    if (userInfo?.success) {
      dispatch(setUser(userInfo.user));
    }
  }, [userInfo]);

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
          const response = await updateToken(refreshToken);

          if ('data' in response && response.data.success) {
            dispatch(setLoggedIn({'isLoggedIn': true}));
          }

        } catch (error: unknown) {
          error instanceof Error ? console.error(error) : console.error("An unexpected error occurred");
        }
      }
    };

    // Вызываем функцию с использованием async/await
    checkTokenValidity();
  }, [dispatch, updateToken]);

  // Выведем прелоудер пока идет загрузка
  if (isLoadingToken || isLoadingIngredients || isLoadingUserInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Routes location={background || location}>
        <Route path={'/'} element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path={'/feed'}>
            <Route index element={<FeedPage/>}/>
            <Route path={':id'} element={<OrderInfo forPrivate={false}/>}/>
          </Route>
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
              <Route index element={<ProfileEditPage/>}/>
              <Route path={'orders'} element={<ProfileOrderPage/>}/>
            </Route>
          </Route>
          <Route element={<ProtectedRouter/>}>
            <Route path={'/profile/orders/:id'} element={<OrderInfo forPrivate={true}/>}/>
          </Route>

          <Route path='*' element={<NotFoundPage/>}/>
        </Route>
      </Routes>

      {
        background && (
          <Routes>
            // Для всех
            <Route path={'ingredients/:id'} element={<Modal backNavigate={true} component={<IngredientDetails/>}/>}/>
            <Route path={'feed/:id'} element={<Modal backNavigate={true} component={<OrderInfo forPrivate={false}/>}/>}/>

            // Только для авторизированных
            <Route element={<ProtectedRouter/>}>
              <Route path={'/profile/orders/:id'}
                     element={<Modal backNavigate={true} component={<OrderInfo forPrivate={true}/>}/>}/>
            </Route>
          </Routes>
        )
      }

    </div>
  );
}

export default App;
