import React, {useState} from 'react';
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './forgot-password-form.module.css';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);
  }

  return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <EmailInput onChange={(e) => setEmail(e.target.value)}
                    placeholder={'Укажите e-mail'}
                    extraClass={'mt-6'}
                    value={email}
                    isIcon={false}/>
        <Button htmlType="submit"
                type="primary"
                size="medium"
                extraClass={'mt-6'}>
          Восстановить
        </Button>
      </form>
  );
}

export default ForgotPasswordForm;
