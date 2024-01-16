import React, {FC} from "react";
import styles from './feed-page.module.css'
import {CardOrder} from "../../components/card-order/card-order";
import {useAppSelector} from "../../hooks/useAppSelector";
import {orderList} from "../../order-list";
import {FeedOrderList} from "../../components/feed-order-list/feed-order-list";
import {IOrder} from "../../types/types";
import {useLocation, useNavigate} from "react-router-dom";

export const FeedPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const ingredients = useAppSelector(state => state.ingredients);

  // Фильтруем ордера по статусу "created"
  const createdOrders = orderList.orders.filter(order => order.status === 'created');

  // Фильтруем ордера по статусу "done"
  const completedOrders = orderList.orders.filter(order => order.status === 'done');

  // Функция для подмены ссылки в адресной строке
  const handleOpenFeedDetails = (element: IOrder) => {
    navigate(`/feed/${element._id}?number=${element.number}`, {'state': {background: location}});
  }

  return (
    <main className={styles.page}>
      <div className={`${styles.flex} ${styles.flexColumn}`}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <div className={`${styles.container} custom-scroll`}>
          {
            orderList.orders.map((order) => {
              // Соберем массив ингредиентов которые были заказаны
              const filteredIngredients = order.ingredients.flatMap(orderIngredientId => {
                const ingredient = ingredients.find(ingredient => ingredient._id === orderIngredientId);
                return ingredient ? [ingredient] : [];
              });

              return <CardOrder key={order._id} order={order} showStatus={false} ingredients={filteredIngredients} onClick={handleOpenFeedDetails}/>
            })
          }
        </div>
      </div>
      <div className={`${styles.info} mt-25`}>
        <div className={`${styles.flex} ${styles.flexRow} ${styles['gap-10']}`}>
          <FeedOrderList title={'Готовы:'} orders={completedOrders} extraClass={'text_color_success'}/>
          <FeedOrderList title={'В работе:'} orders={createdOrders}/>
        </div>
        <div className={`${styles.flex} ${styles.flexColumn}`}>
          <h3 className={'text text_type_main-medium'}>Выполнено за все время:</h3>
          <p className='text text_type_digits-large'>{orderList.total}</p>
        </div>
        <div className={`${styles.flex} ${styles.flexColumn}`}>
          <h3 className={'text text_type_main-medium'}>Выполнено за сегодня:</h3>
          <p className='text text_type_digits-large'>{orderList.totalToday}</p>
        </div>
      </div>
    </main>
  )
    ;
};
