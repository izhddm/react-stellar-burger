import React from 'react';
import styles from './register-page.module.css'
import RegisterForm from "../../components/register-form/register-form";
import BlockTextWithLink from "../../components/block-text-with-link/block-text-with-link";

function RegisterPage() {
  return (
    <main className={styles.page}>
      <RegisterForm/>
      <BlockTextWithLink extraClass={'mt-20'}
                         text={'Уже зарегистрированы?'}
                         url={'/login'}
                         linkText={'Войти'}/>
    </main>
  );
}

export default RegisterPage;
