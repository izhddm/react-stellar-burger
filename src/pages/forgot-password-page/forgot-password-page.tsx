import React, {FC} from 'react';
import styles from "./forgot-password-page.module.css";
import ForgotPasswordForm from "../../components/form/forgot-password-form/forgot-password-form";
import BlockTextWithLink from "../../components/block-text-with-link/block-text-with-link";

const ForgotPasswordPage: FC = () => {
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
