import React from 'react';
import styles from './app-header.module.css'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={styles.header + ' pt-4 pb-4'}>
      <nav className={styles.nav}>
        <div className="pl-5 pr-5">
          <NavLink to={'/'} className={styles.link}>
            {({isActive}) => (
              <>
                <div className={styles.icon}>
                  <BurgerIcon type={isActive ? "primary" : "secondary"}/>
                </div>
                <p className={`text text_type_main-default ml-2 ${isActive ? '' : styles.inactive}`}>Конструктор</p>
              </>
            )}
          </NavLink>
        </div>
        <div className="pl-5 pr-5 ml-2">
          <NavLink to={'/feed'} className={styles.link}>
            {({isActive}) => (
              <>
                <div className={styles.icon}>
                  <ListIcon type={isActive ? "primary" : "secondary"}/>
                </div>
                <p className={`text text_type_main-default ml-2 ${isActive ? '' : styles.inactive}`}>Лента Заказов</p>
              </>
            )}
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo/>
        </div>
        <div className={styles.lk + ' pl-5 pr-5'}>
          <NavLink to={'/profile'} className={styles.link}>
            {({isActive}) => (
              <>
                <div className={styles.icon}>
                  <ProfileIcon type={isActive ? "primary" : "secondary"}/>
                </div>
                <p className={`text text_type_main-default ml-2 ${isActive ? '' : styles.inactive}`}>Личный кабинет</p>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
