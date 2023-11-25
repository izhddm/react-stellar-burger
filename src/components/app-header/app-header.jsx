import React from 'react';
import styles from './app-header.module.css'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={styles.header + ' pt-4 pb-4'}>
      <nav className={styles.nav}>
        <div className="pl-5 pr-5">
          <a href="#" className={styles.link + ' text text_type_main-default'}>
            <div className={styles.icon}><BurgerIcon type="primary"/></div>
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </a>
        </div>
        <div className="pl-5 pr-5 ml-2">
          <a href="#" className={styles.link + ' text text_type_main-default text_color_inactive'}>
            <div className={styles.icon}><ListIcon type="secondary"/></div>
            <p className="text text_type_main-default ml-2">Лента Заказов</p>
          </a>
        </div>
        <div className={styles.logo}>
          <Logo/>
        </div>
        <div className={styles.lk + ' pl-5 pr-5'}>
          <a href="#" className={styles.link + ' text text_type_main-default text_color_inactive'}>
            <div className={styles.icon}><ProfileIcon type="secondary"/></div>
            <p className="text text_type_main-default ml-2">Личный кабинет</p>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
