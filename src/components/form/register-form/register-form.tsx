import React, {FC, FormEvent} from 'react';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './register-form.module.css';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setLoggedIn, setUser} from "../../../services/slices/user-slice";
import {useRegisterUserMutation} from "../../../services/api/user-api";
import {useForm} from "../../../hooks/useForm";
import {FormUserData} from "../../../types/types";


const RegisterForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, {isLoading, isError, error}] = useRegisterUserMutation();
  const {values, handleChange} = useForm<FormUserData>({email: '', name: '', password: ''});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await register(values);

    //Успешная регистрация - редиректим на главную страницу
    if (response?.data?.success) {
      dispatch(setUser(response.data?.user));
      dispatch(setLoggedIn({isLoggedIn: true}))

      navigate('/');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Регистрация</h2>
      <Input name={'name'}
             onChange={handleChange}
             placeholder={'Имя'}
             extraClass={'mt-6'}
             value={values.name}
             required/>
      <EmailInput name={'email'}
                  onChange={handleChange}
                  extraClass={'mt-6'}
                  value={values.email}
                  isIcon={false}
                  required/>
      <PasswordInput name={'password'}
                     onChange={handleChange}
                     value={values.password}
                     extraClass={'mt-6'}
                     required={true}/>
      <Button htmlType="submit"
              type="primary"
              size="medium"
              disabled={isLoading || !values.email || !values.password || !values.name}
              extraClass={'mt-6'}>
        {!isLoading ? 'Зарегистрироваться' : 'Регистрация'}
      </Button>
      {isError && <p
        className={`${styles.errorMessage} text text_type_main-default mt-5`}>{error?.data?.message ?? 'Произошла ошибка, попробуйте еще раз.'}</p>}
    </form>
  );
}

export default RegisterForm;
