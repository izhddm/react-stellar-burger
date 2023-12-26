import React, {useState} from 'react';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './register-form.module.css';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setLoggedIn, setUser} from "../../../services/slices/user-slice";
import {useRegisterUserMutation} from "../../../services/api/user-api";

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
