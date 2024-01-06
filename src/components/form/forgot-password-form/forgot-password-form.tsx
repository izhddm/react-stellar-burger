import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './forgot-password-form.module.css';
import {useNavigate} from "react-router-dom";
import {useForgotPasswordMutation} from "../../../services/api/user-api";
import {useForm} from "../../../hooks/useForm";
import {FC, FormEvent} from "react";

interface FormValues {
  email: string
}

const ForgotPasswordForm: FC = () => {
  const navigate = useNavigate();
  const [forgotPassword, {isLoading, isError, error}] = useForgotPasswordMutation();
  const {values, handleChange} = useForm<FormValues>({'email': ''})

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await forgotPassword(values);

      if (response?.data?.success) {
        navigate('/reset-password', {
          state: {
            email: values.email
          }
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Восстановление пароля</h2>
      <EmailInput onChange={handleChange}
                  name={'email'}
                  placeholder={'Укажите e-mail'}
                  extraClass={'mt-6'}
                  value={values.email}
                  required
                  isIcon={false}/>
      <Button htmlType="submit"
              type="primary"
              size="medium"
              disabled={isLoading || !values.email}
              extraClass={'mt-6'}>
        {!isLoading ? 'Восстановить' : 'Восстановление'}
      </Button>
      {isError && <p
        className={`${styles.errorMessage} text text_type_main-default`}>{error?.data?.message ?? 'Произошла ошибка, попробуйте еще раз.'}</p>}
    </form>
  );
}

export default ForgotPasswordForm;
