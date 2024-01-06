import React, {FC} from 'react';
import styles from './order-details.module.css'
import imgDone from '../../images/done.png'
import {useAppSelector} from "../../hooks/useAppSelector";

const OrderDetails: FC = () => {
  const orderNumber = useAppSelector(state => state.modal.data);
  return (
    <div className={styles.order}>
      <h2 className={'text text_type_digits-large'}>{orderNumber}</h2>
      <h3 className={styles.subtitle + ' text text_type_main-medium'}>идентификатор заказа</h3>
      <img className={styles.image}
           src={imgDone}
           alt='Заказ готовится'
      />
      <p className="text text_type_main-small">
        Ваш заказ начали готовить
      </p>
      <p className={styles.message + ' text text_type_main-small'}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
