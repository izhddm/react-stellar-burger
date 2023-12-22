import React from 'react';
import styles from "./forgot-password-page.module.css";
import ForgotPasswordForm from "../../components/forgot-password-form/forgot-password-form";
import BlockTextWithLink from "../../components/block-text-with-link/block-text-with-link";

function ForgotPasswordPage() {
  return (
    <main className={styles.page}>
      <ForgotPasswordForm/>
      <BlockTextWithLink extraClass={'mt-20'}
                         text={'Вспомнили пароль?'}
                         url={'/login'}
                         linkText={'Войти'}/>
    </main>
  );
}

export default ForgotPasswordPage;
