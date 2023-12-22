import React from 'react';
import styles from "./forgot-password-page.module.css";
import {Link} from "react-router-dom";
import ForgotPasswordForm from "../../components/forgot-password-form/forgot-password-form";

function ForgotPasswordPage() {
  return (
    <main className={styles.page}>
      <ForgotPasswordForm/>
      <div className={`${styles.flex} mt-20`}>
        <p className={`${styles.text} text text_type_main-default`}>Вспомнили пароль?</p>
        <Link to={'/login'} className={`text text_type_main-default ${styles.link}`}>Войти</Link>
      </div>
    </main>
  );
}

export default ForgotPasswordPage;
