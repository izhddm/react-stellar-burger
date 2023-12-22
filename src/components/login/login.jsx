import React, {useState} from 'react';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import {Link} from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Вход</h2>
        <EmailInput onChange={(e) => setEmail(e.target.value)}
                    extraClass={'mt-6'}
                    value={email}
                    isIcon={false}/>
        <PasswordInput name={'password'}
                       onChange={e => setPassword(e.target.value)}
                       value={password}
                       extraClass={'mt-6'}
                       required={true}/>
        <Button htmlType="submit"
                type="primary"
                size="medium"
                extraClass={'mt-6'}>
          Вход
        </Button>
      </form>
      <div className={`${styles.flex} mt-20`}>
        <p className={`${styles.text} text text_type_main-default`}>Вы — новый пользователь?</p>
        <Link to={'/register'} className={`text text_type_main-default ${styles.link}`}>Зарегистрироваться</Link>
      </div>
      <div className={`${styles.flex} mt-4`}>
        <p className={`${styles.text} text text_type_main-default`}>Забыли пароль?</p>
        <Link to={'/forgot-password'} className={`text text_type_main-default ${styles.link}`}>Восстановить
          пароль</Link>
      </div>
    </>
  );
}

export default Login;
