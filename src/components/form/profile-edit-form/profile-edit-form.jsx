import React, {useState} from 'react';
import styles from "./profile-edit-form.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

function ProfileEditForm() {
  const [userName, setUserName] = useState('аааа');
  const [email, setEmail] = useState('dfff');
  const [password, setPassword] = useState('dfdffdf');
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(userName, email, password);
  }

  return (
    <form className={'mt-30 ml-15'} onSubmit={handleSubmit}>
      <Input onChange={e => setUserName(e.target.value)}
             placeholder={'Имя'}
             value={userName}
             icon={"EditIcon"}
             contentEditable={false}
             required={true}/>
      <EmailInput onChange={(e) => setEmail(e.target.value)}
                  placeholder={'Логин'}
                  extraClass={'mt-6'}
                  value={email}
                  icon={"EditIcon"}
                  required={true}/>
      <PasswordInput name={'password'}
                     onChange={e => setPassword(e.target.value)}
                     value={password}
                     extraClass={'mt-6'}
                     icon={"EditIcon"}
                     required={true}/>
      <div className={`${styles.buttons} mt-6`}>
        <Button htmlType="button" type="secondary" size="small">
          Отмена
        </Button>
        <Button htmlType="button" type="primary" size="medium">
          Сохранить
        </Button>
      </div>
    </form>
  );
}

export default ProfileEditForm;
