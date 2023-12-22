import React from 'react';
import styles from './login-page.module.css'
import LoginForm from "../../components/login-form/login-form";
import BlockTextWithLink from "../../components/block-text-with-link/block-text-with-link";

function LoginPage() {
  return (
    <main className={styles.page}>
      <LoginForm/>
      <BlockTextWithLink extraClass={'mt-20'}
                         text={'Вы — новый пользователь?'}
                         url={'/register'}
                         linkText={'Зарегистрироваться'}/>
      <BlockTextWithLink extraClass={'mt-4'}
                         text={'Забыли пароль?'}
                         url={'/forgot-password'}
                         linkText={'Восстановить пароль'}/>
    </main>
  );
}

export default LoginPage;
