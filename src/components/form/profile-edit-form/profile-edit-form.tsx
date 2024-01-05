import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {setUser} from "../../../services/slices/user-slice";
import styles from './profile-edit-form.module.css';
import {useUpdateUserInfoMutation} from "../../../services/api/user-api";
import {useForm} from "../../../hooks/useForm";
import {FormUserData} from "../../../types/types";

type UpdatedData = Partial<FormUserData>

const ProfileEditForm: FC = () => {
  const dispatch = useDispatch();
  const {email: defaultEmail, name: defaultName} = useSelector((state: any) => state.user);
  const [updateUserInfo, {isLoading: isUpdatingUserInfo}] = useUpdateUserInfoMutation();

  const {values, handleChange, setValues} = useForm<FormUserData>({
    email: defaultEmail,
    name: defaultName,
    password: ''
  });

  useEffect(() => {
    setValues({email: defaultEmail, name: defaultName, password: ''});
  }, [defaultEmail, defaultName]);


  const isFormEdited = values.name !== defaultName || values.email !== defaultEmail || values.password !== '';

  // Сбрасываем значения полей формы к начальным
  const handleCancel = () => {
    setValues({email: defaultEmail, name: defaultName, password: ''});
  };

  const handleSave = async () => {
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

      if (response?.data?.success) {
        dispatch(setUser(response.data.user));
      }
    }
  };

  return (
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
