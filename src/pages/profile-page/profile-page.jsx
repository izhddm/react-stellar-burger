import React from 'react';
import styles from './profile-page.module.css'
import {NavLink, Outlet} from "react-router-dom";

function ProfilePage() {
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
          to={'/login'}
          className={navActiveClass}>
          <h3 onClick={event => event.preventDefault()} className='text text_type_main-medium mt-5 mb-4'>Выход</h3>
        </NavLink>
        <p className={`text text_type_main-default text_color_inactive mt-20 ${styles.text}`}>В этом разделе вы можете
          изменять свои персональные данные</p>
      </nav>
      <Outlet/>
    </main>
  );
}

export default ProfilePage;
