import React, {useState} from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './reset-password-form.module.css';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(password, code);
  }

  return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <PasswordInput name={'password'}
                       onChange={e => setPassword(e.target.value)}
                       value={password}
                       extraClass={'mt-6'}
                       placeholder={'Введите новый пароль'}
                       required={true}/>
        <Input onChange={e => setCode(e.target.value)}
               placeholder={'Введите код из письма'}
               extraClass={'mt-6'}
               value={code}
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

export default ResetPasswordForm;
