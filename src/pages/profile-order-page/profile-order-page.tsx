import React, {FC} from "react";
import styles from "./profile-order-page.module.css"
import {useAppSelector} from "../../hooks/useAppSelector";
import {orderList} from "../../order-list";
import {CardOrder} from "../../components/card-order/card-order";
import {useLocation, useNavigate} from "react-router-dom";
import {IOrder} from "../../types/types";

export const ProfileOrderPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const ingredients = useAppSelector(state => state.ingredients);

  // Функция для подмены ссылки в адресной строке
  const handleOpenFeedDetails = (element: IOrder) => {
    navigate(`/profile/orders/${element._id}?number=${element.number}`, {'state': {background: location}});
  }

  return (
    <div className={`${styles.container} ml-10 mt-9 pt-2 custom-scroll`}>
      {
        orderList.orders.map((order) => {
          // Соберем массив ингредиентов которые были заказаны
          const filteredIngredients = order.ingredients.flatMap(orderIngredientId => {
            const ingredient = ingredients.find(ingredient => ingredient._id === orderIngredientId);
            return ingredient ? [ingredient] : [];
          });

          return <CardOrder key={order._id} order={order} showStatus={true} ingredients={filteredIngredients} onClick={handleOpenFeedDetails}/>
        })
      }
    </div>
  );
};
