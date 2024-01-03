import React, {FormEvent, useEffect} from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './reset-password-form.module.css';
import {useResetPasswordMutation} from "../../../services/api/user-api";
import {useLocation, useNavigate} from "react-router-dom";
import {useForm} from "../../../hooks/useForm";
import {FormType} from "../../../utils/types";

interface FormValues {
  password: string,
  token: string
}

function ResetPasswordForm() {
  const [resetPassword, {isLoading, isSuccess, isError, error}] = useResetPasswordMutation();
  const {values, handleChange, setValues}:FormType<FormValues> = useForm<FormValues>({password: '', token: ''});

  const navigate = useNavigate();
  const location = useLocation();

  // Пользователь перешел по прямой ссылке, вернем его назад
  useEffect(() => {
    if (!location?.state?.email) {
      navigate('/forgot-password');
    }
  }, [location]);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await resetPassword(values);

    if (response?.data?.success) {
      setValues({password: '', token: ''})

      navigate('/login');
    }
  }

  return (<form className={styles.form} onSubmit={handleSubmit}>
    <h2 className={styles.title}>Восстановление пароля</h2>
    <PasswordInput name={'password'}
                   onChange={handleChange}
                   value={values.password}
                   extraClass={'mt-6'}
                   placeholder={'Введите новый пароль'}
                   required/>
    <Input name={'token'}
           onChange={handleChange}
           placeholder={'Введите код из письма'}
           extraClass={'mt-6'}
           value={values.token}
           required/>
    <Button htmlType="submit"
            type="primary"
            size="medium"
            disabled={isLoading || isSuccess || !values.password || !values.token}
            extraClass={'mt-6'}>
      {!isLoading ? 'Сохранить' : 'Происходит сохранение'}
    </Button>
    {isError && <p
      className={`${styles.errorMessage} text text_type_main-default mt-5`}>{error?.data?.message ?? 'Произошла ошибка, попробуйте еще раз.'}</p>}
  </form>);
}

export default ResetPasswordForm;
