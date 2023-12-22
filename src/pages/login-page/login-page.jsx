import React from 'react';
import styles from './login-page.module.css'
import Login from "../../components/login/login";

function LoginPage() {
  return (
    <main className={styles.page}>
      <Login/>
    </main>
  );
}

export default LoginPage;
