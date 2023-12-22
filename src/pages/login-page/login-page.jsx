import React from 'react';
import styles from './login-page.module.css'
import LoginForm from "../../components/login-form/login-form";
import {Link} from "react-router-dom";

function LoginPage() {
  return (
    <main className={styles.page}>
      <LoginForm/>
      <div className={`${styles.flex} mt-20`}>
        <p className={`${styles.text} text text_type_main-default`}>Вы — новый пользователь?</p>
        <Link to={'/register'} className={`text text_type_main-default ${styles.link}`}>Зарегистрироваться</Link>
      </div>
      <div className={`${styles.flex} mt-4`}>
        <p className={`${styles.text} text text_type_main-default`}>Забыли пароль?</p>
        <Link to={'/forgot-password'} className={`text text_type_main-default ${styles.link}`}>Восстановить
          пароль</Link>
      </div>
    </main>
  );
}

export default LoginPage;
