import React, {useState} from 'react';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './register-form.module.css';
import {useRegisterUserMutation} from "../../../services/api";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../../services/slices/user-slice";

function RegisterForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [register, {isLoading, isError, error}] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await register({
      email,
      name,
      password
    });

    //Успешная регистрация - редиректим на страницу логина
    if (response?.data?.success) {
      localStorage.setItem('accessToken', response.data?.accessToken);
      localStorage.setItem('refreshToken', response.data?.refreshToken);
      dispatch(setUser(response.data?.user));

      navigate('/login');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Регистрация</h2>
      <Input onChange={e => setName(e.target.value)}
             placeholder={'Имя'}
             extraClass={'mt-6'}
             value={name}
             required/>
      <EmailInput onChange={(e) => setEmail(e.target.value)}
                  extraClass={'mt-6'}
                  value={email}
                  isIcon={false}
                  required/>
      <PasswordInput name={'password'}
                     onChange={e => setPassword(e.target.value)}
                     value={password}
                     extraClass={'mt-6'}
                     required={true}/>
      <Button htmlType="submit"
              type="primary"
              size="medium"
              disabled={isLoading || !email || !password || !name}
              extraClass={'mt-6'}>
        {!isLoading ? 'Зарегистрироваться' : 'Регистрация'}
      </Button>
      {isError && <p
        className={`${styles.errorMessage} text text_type_main-default mt-5`}>{error?.data?.message ?? 'Произошла ошибка, попробуйте еще раз.'}</p>}
    </form>
  );
}

export default RegisterForm;
