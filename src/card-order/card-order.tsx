import React, {FC} from "react";
import styles from './card-order.module.css'
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {orderList} from "../order-list";
import {BurgerCost} from "../components/burger-cost/burger-cost";
import {CardIngredients} from "../components/card-ingredients/card-ingredients";
import {useAppSelector} from "../hooks/useAppSelector";

interface IProps {
  showStatus: boolean
}

export const CardOrder: FC<IProps> = ({showStatus}) => {
  const ingredients = useAppSelector(state => state.ingredients);

  return (
    <>
      {
        orderList.orders.map((order) => {
          // Отформатируем строку с номером заказа к виду #000000
          const orderNumber = `#${order.number.toString().padStart(6, '0')}`;

          // Соберем массив ингредиентов которые были заказаны
          const filteredIngredients = order.ingredients.flatMap(orderIngredientId => {
            const ingredient = ingredients.find(ingredient => ingredient._id === orderIngredientId);
            return ingredient ? [ingredient] : [];
          });

          // Расчитаем стоимость сборки бургера
          const totalCost = filteredIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

          return (
            <div key={order._id} className={`${styles.container} ml-2 mr-2 p-6`}>
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
                <p className={`text text_type_main-default mt-2 ${order.status === 'done' ? styles.done : ''}`}>
                  {order.status === 'created' ? 'Готовится' : 'Выполнен'}
                </p>}
              <div className={`${styles.line} mt-6`}>
                <CardIngredients ingredients={filteredIngredients}/>
                <BurgerCost value={totalCost}/>
              </div>
            </div>
          )
        })
      }
    </>
  );
};
