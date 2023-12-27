import React from 'react';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login-form.module.css';
import {useDispatch} from "react-redux";
import {setLoggedIn, setUser} from "../../../services/slices/user-slice";
import {useLocation, useNavigate} from "react-router-dom";
import {useLoginMutation} from "../../../services/api/auth-api";
import {useForm} from "../../../hooks/useForm";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const {values, handleChange} = useForm({email: '', password: ''});

  const [login, {isLoading, isError, error}] = useLoginMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(values);

    // Успешно авторизовались
    if (response?.data?.success) {
      dispatch(setUser(response.data.user));
      dispatch(setLoggedIn({isLoggedIn: true}))

      navigate(from, {'state': {'from': location}});
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Вход</h2>
      <EmailInput name={'email'}
                  onChange={handleChange}
                  extraClass={'mt-6'}
                  value={values.email}
                  isIcon={false}/>
      <PasswordInput name={'password'}
                     onChange={handleChange}
                     value={values.password}
                     extraClass={'mt-6'}
                     required={true}/>
      <Button htmlType="submit"
              type="primary"
              size="medium"
              disabled={isLoading || !values.email || !values.password}
              extraClass={'mt-6'}>
        {!isLoading ? 'Вход' : 'Входим'}
      </Button>
      {isError && <p
        className={`${styles.errorMessage} text text_type_main-default mt-5`}>{error?.data?.message ?? 'Произошла ошибка, попробуйте еще раз.'}</p>}
    </form>
  );
}

export default LoginForm;
