import React, {FC} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAppSelector} from "../../hooks/useAppSelector";

interface ProtectedRouterProps {
  anonymous?: true | false
}

const ProtectedRouter: FC<ProtectedRouterProps> = ({anonymous = false}) => {

  const isLoggedIn = useAppSelector((store) => store.user.isLoggedIn);

  const location = useLocation();
  const from = location.state?.from || '/';
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isLoggedIn) {

    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from}/>;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{from: location}}/>;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return <Outlet/>;
}

export default ProtectedRouter;
