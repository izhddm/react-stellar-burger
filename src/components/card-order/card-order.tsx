import React, {FC} from "react";
import styles from './card-order.module.css'
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerCost} from "../burger-cost/burger-cost";
import {CardIngredients} from "../card-ingredients/card-ingredients";
import {IOrder, TIngredients} from "../../types/types";

interface IProps {
  order: IOrder,
  ingredients: TIngredients,
  showStatus: boolean,
  onClick: (element: IOrder) => void
}

export const CardOrder: FC<IProps> = ({order, showStatus, ingredients, onClick}) => {
  // Отформатируем строку с номером заказа к виду #000000
  const orderNumber = `#${order.number.toString().padStart(6, '0')}`;

  // Рассчитаем стоимость сборки бургера
  const totalCost = ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

  // Статусы
  let statusText: string;
  let statusClassName = '';

  switch (order.status) {
    case 'created':
      statusText = 'Готовится';
      break;
    case 'pending':
      statusText = 'В ожидании';
      break;
    case 'done':
      statusText = 'Выполнен';
      statusClassName = styles.done;
      break;
    default:
      statusText = 'Статус неизвестен';
      break;
  }

  return (
    <div key={order._id} className={`${styles.card} ml-2 mr-2 p-6`} onClick={() => {
      onClick(order)
    }}>
      <div className={styles.line}>
        <p
          className={`${styles['no-margin']} text text_type_digits-default text_color_primary`}>{orderNumber}</p>
        <FormattedDate date={new Date(order.updatedAt)}
                       className={'text text_type_main-default text_color_inactive'}/>
      </div>
      <h3 className={'mt-6 text text_type_main-medium text_color_primary'}>
        {order.name}
      </h3>
      {showStatus &&
        <p className={`text text_type_main-default mt-2 ${statusClassName}`}>
          {statusText}
        </p>}
      <div className={`${styles.line} mt-6`}>
        <CardIngredients ingredients={ingredients}/>
        <BurgerCost value={totalCost}/>
      </div>
    </div>
  );
};
