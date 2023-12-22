import React, {useState} from 'react';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login-form.module.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);
  }

  return (
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
  );
}

export default LoginForm;
