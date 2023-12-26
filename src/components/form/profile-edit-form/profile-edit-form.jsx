import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {setUser} from "../../../services/slices/user-slice";
import styles from './profile-edit-form.module.css';
import {useGetUserInfoQuery, useUpdateUserInfoMutation} from "../../../services/api/user-api";

function ProfileEditForm() {
  const dispatch = useDispatch();
  const {email: userEmail, name: userName} = useSelector((state) => state.user);

  const [updatedUserName, setUpdatedUserName] = useState(userName);
  const [updatedEmail, setUpdatedEmail] = useState(userEmail);
  const [updatedPassword, setUpdatedPassword] = useState('');

  // Получим данные о пользователе при монтировании
  const {data, isLoading: isLoadingUserInfo} = useGetUserInfoQuery();

  useEffect(() => {
    if (data?.success) {
      dispatch(setUser(data.user));
      setUpdatedUserName(data.user.name);
      setUpdatedEmail(data.user.email)
    }
  }, [data]);


  const isFormEdited = updatedUserName !== userName || updatedEmail !== userEmail || updatedPassword !== '';

  const [updateUserInfo, {isLoading: isUpdatingUserInfo}] = useUpdateUserInfoMutation();

  const handleCancel = () => {
    // Сбрасываем значения полей формы к начальным
    setUpdatedUserName(userName);
    setUpdatedEmail(userEmail);
    setUpdatedPassword('');
  };

  const handleSave = async () => {
    const updatedData = {};

    if (updatedUserName !== userName) {
      updatedData.name = updatedUserName;
    }

    if (updatedEmail !== userEmail) {
      updatedData.email = updatedEmail;
    }

    if (updatedPassword !== '') {
      updatedData.password = updatedPassword;
    }

    if (Object.keys(updatedData).length > 0) {
      const response = await updateUserInfo(updatedData);

      if (response.status){
        dispatch(setUser(response.user));
        setUpdatedPassword('');
      }
    }
  };

  return (
    !isLoadingUserInfo &&
    <form className={'mt-30 ml-15'}>
      <Input
        onChange={(e) => setUpdatedUserName(e.target.value)}
        placeholder={'Имя'}
        value={updatedUserName}
        icon={"EditIcon"}
        contentEditable={false}
        required={true}
      />
      <EmailInput
        onChange={(e) => setUpdatedEmail(e.target.value)}
        placeholder={'Логин'}
        extraClass={'mt-6'}
        value={updatedEmail}
        icon={"EditIcon"}
        required={true}
      />
      <PasswordInput
        name={'password'}
        onChange={(e) => setUpdatedPassword(e.target.value)}
        value={updatedPassword}
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
