import React, {useState} from 'react';
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './forgot-password-form.module.css';
import {useNavigate} from "react-router-dom";
import {useForgotPasswordMutation} from "../../../services/api/user-api";

function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [forgotPassword, {isLoading, isError, error}] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await forgotPassword({email});

      if (response?.data?.success) {
        navigate('/reset-password');
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <EmailInput onChange={(e) => setEmail(e.target.value)}
                  placeholder={'Укажите e-mail'}
                  extraClass={'mt-6'}
                  value={email}
                  required
                  isIcon={false}/>
      <Button htmlType="submit"
              type="primary"
              size="medium"
              disabled={isLoading || !email}
              extraClass={'mt-6'}>
        {!isLoading ? 'Восстановить': 'Восстановление'}
      </Button>
      {isError && <p
        className={`${styles.errorMessage} text text_type_main-default`}>{error?.data?.message ?? 'Произошла ошибка, попробуйте еще раз.'}</p>}
    </form>
  );
}

export default ForgotPasswordForm;
