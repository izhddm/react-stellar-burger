import React from 'react';
import styles from './register-page.module.css'
import {Link} from "react-router-dom";
import RegisterForm from "../../components/register-form/register-form";

function RegisterPage() {
  return (
    <main className={styles.page}>
      <RegisterForm/>
      <div className={`${styles.flex} mt-20`}>
        <p className={`${styles.text} text text_type_main-default`}>Уже зарегистрированы?</p>
        <Link to={'/login'} className={`text text_type_main-default ${styles.link}`}>Войти</Link>
      </div>
    </main>
  );
}

export default RegisterPage;
