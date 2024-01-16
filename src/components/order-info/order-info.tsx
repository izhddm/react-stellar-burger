import React, {FC} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-info.module.css'
import {BurgerCost} from "../burger-cost/burger-cost";
import {orderList} from "../../order-list";
import {useAppSelector} from "../../hooks/useAppSelector";
import {OrderInfoIngredient} from "../../order-info-ingredient/order-info-ingredient";
import {TIngredient} from "../../types/types";

export const OrderInfo: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // id из адресной строки
  const {id} = useParams();
  const number = searchParams.get('number');

  const ingredients = useAppSelector(store => store.ingredients);

  const order = orderList.orders.find((order) => order._id === id);

  // Получим ингредиенты по их id
  const orderIngredientsMap = new Map<string, { ingredient: TIngredient; count: number }>();

  order?.ingredients.forEach((orderIngredientId) => {
    const ingredient = ingredients.find((ingredient) => ingredient._id === orderIngredientId);

    if (ingredient) {
      const existingIngredient = orderIngredientsMap.get(ingredient._id);

      if (existingIngredient) {
        existingIngredient.count += 1;
      } else {
        orderIngredientsMap.set(ingredient._id, {ingredient, count: 1});
      }
    }
  });

  const orderIngredients = Array.from(orderIngredientsMap.values()).map(({ingredient, count}) => ({
    ingredient,
    count,
  }));

  // Общая стоимость
  const totalCost = orderIngredients.reduce((acc, element) => acc + element.ingredient.price * element.count, 0);

  return (
    <div className={`${styles.container} m-10`}>
      <p className={`${styles.number} text text_type_digits-default`}>#034533</p>
      <h2 className={'text text_type_main-medium mt-5'}>{order?.name}</h2>
      <p className={`text text_type_main-default mt-2 ${order?.status === 'done' ? styles.done : ''}`}>
        {order?.status === 'done' ? 'Выполнен' : 'Создан'}
      </p>
      <p className={'text text_type_main-medium mt-15'}>Состав:</p>
      <div
        className={`${styles.flex} ${styles.flexGap} mt-6 ${orderIngredients.length > 4 ? `${styles.ingredients} custom-scroll` : ''}`}>
        {
          orderIngredients?.map((element) => {
            return (
              <OrderInfoIngredient key={element.ingredient._id} count={element.count} ingredient={element.ingredient}
                                   extraClass={orderIngredients.length > 4 ? 'mr-6' : ''}/>
            )
          })
        }
      </div>
      <div className={`${styles.flexRow} mt-10`}>
        <FormattedDate date={new Date()}
                       className={'text text_type_main-default text_color_inactive'}/>
        <BurgerCost className={'text text_type_digits-default mr-2'} value={totalCost}/>
      </div>
    </div>
  );
};
