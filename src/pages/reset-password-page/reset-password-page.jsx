import React from 'react';
import styles from "./reset-password-page.module.css";
import ResetPasswordForm from "../../components/form/reset-password-form/reset-password-form";
import BlockTextWithLink from "../../components/block-text-with-link/block-text-with-link";

function ResetPasswordPage() {
  return (
    <main className={styles.page}>
      <ResetPasswordForm/>
      <BlockTextWithLink extraClass={'mt-20'}
                         text={'Вспомнили пароль?'}
                         url={'/login'}
                         linkText={'Войти'}/>
    </main>
  );
}

export default ResetPasswordPage;
