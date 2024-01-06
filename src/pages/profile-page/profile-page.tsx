import React, {FC} from 'react';
import styles from './profile-page.module.css'
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useLogoutMutation} from "../../services/api/auth-api";
import {resetUser} from "../../services/slices/user-slice";
import {useAppDispatch} from "../../hooks/useAppDispatch";

type NavLinkRenderProps = {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
};

const ProfilePage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [logout, {isLoading}] = useLogoutMutation();

  const handleLogoutBtn = async (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.preventDefault();

    const token = localStorage.getItem('refreshToken');

    if (token) {
      const response = await logout();

      if (response?.data?.success) {
        dispatch(resetUser());
        navigate('/login');
      }
    }
  }

  const navActiveClass = ({isActive}: NavLinkRenderProps) => `${styles.link} ${!isActive ? styles.inactive : ''}`;
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
