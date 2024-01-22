import React, {FC, FormEvent, useEffect, useState} from 'react';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {setUser} from "../../../services/slices/user-slice";
import styles from './profile-edit-form.module.css';
import {useGetUserInfoQuery, useUpdateUserInfoMutation} from "../../../services/api/user-api";
import {useForm} from "../../../hooks/useForm";
import {FormUserData} from "../../../types/types";
import {useAppDispatch} from "../../../hooks/useAppDispatch";

type UpdatedData = Partial<FormUserData>

const ProfileEditForm: FC = () => {
  const dispatch = useAppDispatch();
  const [defaultEmail, setDefaultEmail] = useState('');
  const [defaultName, setDefaultName] = useState('');
  const [updateUserInfo, {isLoading: isUpdatingUserInfo}] = useUpdateUserInfoMutation();

  const {data: userInfo, isLoading: isLoadingUserInfo} = useGetUserInfoQuery(); // Получение данных о юзере

  const {values, handleChange, setValues} = useForm<FormUserData>({
    email: defaultEmail,
    name: defaultName,
    password: ''
  });

  useEffect(() => {
    if (userInfo?.success) {
      setDefaultEmail(userInfo.user.email);
      setDefaultName(userInfo.user.name);
      setValues({email: userInfo.user.email, name: userInfo.user.name, password: ''});
    }
  }, [userInfo]);

  const isFormEdited = values.name !== defaultName || values.email !== defaultEmail || values.password !== '';

  // Сбрасываем значения полей формы к начальным
  const handleCancel = () => {
    setValues({email: defaultEmail, name: defaultName, password: ''});
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedData: UpdatedData = {};

    if (values.name !== defaultName) {
      updatedData.name = values.name;
    }

    if (values.email !== defaultEmail) {
      updatedData.email = values.email;
    }

    if (values.password !== '') {
      updatedData.password = values.password;
    }

    if (Object.keys(updatedData).length > 0) {
      const response = await updateUserInfo(updatedData);

      if ('data' in response && response.data?.success) {
        dispatch(setUser(response.data.user));
      }
    }
  };

  if (isLoadingUserInfo){
    return <div>Loading...</div>
  }

  return (
    <form className={'mt-30 ml-15'} onSubmit={handleSave}>
      <Input
        name={'name'}
        onChange={handleChange}
        placeholder={'Имя'}
        value={values.name}
        icon={"EditIcon"}
        contentEditable={false}
        required={true}
      />
      <EmailInput
        name={'email'}
        onChange={handleChange}
        placeholder={'Логин'}
        extraClass={'mt-6'}
        value={values.email}
        required={true}
      />
      <PasswordInput
        name={'password'}
        onChange={handleChange}
        value={values.password}
        extraClass={'mt-6'}
        icon={"EditIcon"}
        required={true}
      />
      {isFormEdited && <div className={`${styles.buttons} mt-6`}>
        <Button htmlType="button" type="secondary" size="small" onClick={handleCancel}>
          Отмена
        </Button>
        <Button htmlType="submit" type="primary" size="medium" disabled={isUpdatingUserInfo}>
          Сохранить
        </Button>
      </div>
      }
    </form>
  );
}

export default ProfileEditForm;
