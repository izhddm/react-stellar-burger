import React from 'react';
import styles from './profile-page.module.css'
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useLogoutUserMutation} from "../../services/api";

function ProfilePage() {
  const navigate = useNavigate();

  const [logout, {isLoading}] = useLogoutUserMutation();

  const handleLogoutBtn = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('refreshToken');

    if (token) {
      const response = await logout({
        token
      });

      if (response?.data?.success) {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        navigate('/login');
      }
    }
  }

  const navActiveClass = ({isActive}) => `${styles.link} ${!isActive ? styles.inactive : ''}`;
  return (
    <main className={styles.page}>
      <nav className={`${styles.nav} mt-30 ml-5`}>
        <NavLink
          to={'/profile'}
          className={navActiveClass}
          end>
          <h3 className='text text_type_main-medium mt-4 mb-4'>Профиль</h3>
        </NavLink>
        <NavLink
          to={'/profile/orders'}
          className={navActiveClass}
          end>
          <h3 className='text text_type_main-medium mt-5 mb-4'>История заказов</h3>
        </NavLink>
        <NavLink
          to={'/profile/logout'}
          className={navActiveClass}>
          <h3 onClick={handleLogoutBtn}
              className='text text_type_main-medium mt-5 mb-4'>{!isLoading ? 'Выход' : 'Выходим'}</h3>
        </NavLink>
        <p className={`text text_type_main-default text_color_inactive mt-20 ${styles.text}`}>В этом разделе вы можете
          изменять свои персональные данные</p>
      </nav>
      <Outlet/>
    </main>
  );
}

export default ProfilePage;
