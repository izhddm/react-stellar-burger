import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {setUser} from "../../../services/slices/user-slice";
import styles from './profile-edit-form.module.css';
import {useGetUserInfoQuery, useUpdateUserInfoMutation} from "../../../services/api/user-api";
import {useForm} from "../../../hooks/useForm";

function ProfileEditForm() {
  const dispatch = useDispatch();
  const {email: userEmail, name: userName} = useSelector((state) => state.user);

  const {values, handleChange, setValues} = useForm({email: userEmail, name: userName, password: ''});

  // Получим данные о пользователе при монтировании
  const {data, isLoading: isLoadingUserInfo} = useGetUserInfoQuery();

  useEffect(() => {
    if (data?.success) {
      dispatch(setUser(data.user));
      setValues({name: data.user.name, email: data.user.email})
    }
  }, [data]);


  const isFormEdited = values.name !== userName || values.email !== userEmail || values.password !== '';

  const [updateUserInfo, {isLoading: isUpdatingUserInfo}] = useUpdateUserInfoMutation();

  const handleCancel = () => {
    // Сбрасываем значения полей формы к начальным
    setValues({email: userEmail, name: userName, password: ''});
  };

  const handleSave = async () => {
    const updatedData = {};

    if (values.name !== userName) {
      updatedData.name = values.name;
    }

    if (values.email !== userEmail) {
      updatedData.email = values.email;
    }

    if (values.password !== '') {
      updatedData.password = values.password;
    }

    if (Object.keys(updatedData).length > 0) {
      const response = await updateUserInfo(updatedData);

      if (response.status) {
        dispatch(setUser(response.user));
        setValues({password: ''});
      }
    }
  };

  return (
    !isLoadingUserInfo &&
    <form className={'mt-30 ml-15'}>
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
        icon={"EditIcon"}
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
        <Button htmlType="button" type="primary" size="medium" onClick={handleSave} disabled={isUpdatingUserInfo}>
          Сохранить
        </Button>
      </div>
      }
    </form>
  );
}

export default ProfileEditForm;
