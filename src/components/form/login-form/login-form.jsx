import React, {useState} from 'react';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login-form.module.css';
import {useDispatch} from "react-redux";
import {setUser} from "../../../services/slices/user-slice";
import {useNavigate} from "react-router-dom";
import {useLoginMutation} from "../../../services/api/auth-api";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, {isLoading, isError, error}] = useLoginMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login({
      email,
      password
    });

    // Успешно авторизовались
    if (response?.data?.success) {
      dispatch(setUser(response.data.user));

      navigate('/');
    }
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
              disabled={isLoading || !email || !password}
              extraClass={'mt-6'}>
        {!isLoading ? 'Вход' : 'Входим'}
      </Button>
      {isError && <p
        className={`${styles.errorMessage} text text_type_main-default mt-5`}>{error?.data?.message ?? 'Произошла ошибка, попробуйте еще раз.'}</p>}
    </form>
  );
}

export default LoginForm;
