import React from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";


function ProtectedRouter({anonymous = false}) {
    const isLoggedIn = useSelector((store) => store.user.isLoggedIn);

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
