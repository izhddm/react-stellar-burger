import React, {FC} from "react";
import styles from "./profile-order-page.module.css"
import {useAppSelector} from "../../hooks/useAppSelector";
import {CardOrder} from "../../components/card-order/card-order";
import {useLocation, useNavigate} from "react-router-dom";
import {IOrder} from "../../types/types";
import {useGetOrdersQuery} from "../../services/api/orders-api";

export const ProfileOrderPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const ingredients = useAppSelector(state => state.ingredients);

  const {data: orderList, isLoading: isLoadingOrders} = useGetOrdersQuery(true);

  // Идет загрузка
  if (isLoadingOrders){
    return <div>Loading...</div>;
  }

  // Функция для подмены ссылки в адресной строке
  const handleOpenFeedDetails = (element: IOrder) => {
    navigate(`/profile/orders/${element._id}?number=${element.number}`, {'state': {background: location}});
  }

  return (
    <div className={`${styles.container} ml-10 mt-9 pt-2 custom-scroll`}>
      {
        orderList?.orders.map((order) => {
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
