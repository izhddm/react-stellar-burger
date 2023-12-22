import React, {useState} from 'react';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './register-form.module.css';

function RegisterForm() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(userName, email, password);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Регистрация</h2>
      <Input onChange={e => setUserName(e.target.value)}
             placeholder={'Имя'}
             extraClass={'mt-6'}
             value={userName}
             required={true}/>
      <EmailInput onChange={(e) => setEmail(e.target.value)}
                  extraClass={'mt-6'}
                  value={email}
                  isIcon={false}
                  required={true}/>
      <PasswordInput name={'password'}
                     onChange={e => setPassword(e.target.value)}
                     value={password}
                     extraClass={'mt-6'}
                     required={true}/>
      <Button htmlType="submit"
              type="primary"
              size="medium"
              extraClass={'mt-6'}>
        Зарегистрироваться
      </Button>
    </form>
  );
}

export default RegisterForm;
