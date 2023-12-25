import React, {useEffect, useState} from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './reset-password-form.module.css';
import {useResetPasswordMutation} from "../../../services/api/user-api";
import {useLocation, useNavigate} from "react-router-dom";

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [resetPassword, {isLoading, isSuccess, isError, error}] = useResetPasswordMutation();

  const navigate = useNavigate(); // Используем useNavigate для навигации
  const location = useLocation();

  // Пользователь перешел по прямой ссылке, вернем его назад
  useEffect(() => {
    // Пользователь перешел по прямой ссылке, вернем его назад
    console.log(location?.state?.email);
    if (!location?.state?.email) {
      navigate('/forgot-password');
    }
  }, [location]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await resetPassword({
      password, token
    });

    //Проверим ответ от сервера
    if (response?.data?.success) {
      // Обнулить пароль и токен после успешного сохранения
      setPassword('');
      setToken('');

      navigate('/login');
    }
  }

  return (<form className={styles.form} onSubmit={handleSubmit}>
    <h2 className={styles.title}>Восстановление пароля</h2>
    <PasswordInput name={'password'}
                   onChange={e => setPassword(e.target.value)}
                   value={password}
                   extraClass={'mt-6'}
                   placeholder={'Введите новый пароль'}
                   required/>
    <Input onChange={e => setToken(e.target.value)}
           placeholder={'Введите код из письма'}
           extraClass={'mt-6'}
           value={token}
           required/>
    <Button htmlType="submit"
            type="primary"
            size="medium"
            disabled={isLoading || isSuccess || !password || !token}
            extraClass={'mt-6'}>
      {!isLoading ? 'Сохранить' : 'Происходит сохранение'}
    </Button>
    {isError && <p
      className={`${styles.errorMessage} text text_type_main-default mt-5`}>{error?.data?.message ?? 'Произошла ошибка, попробуйте еще раз.'}</p>}
  </form>);
}

export default ResetPasswordForm;
