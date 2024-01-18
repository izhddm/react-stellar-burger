import React, {FC} from "react";
import {TOrders} from "../../types/types";
import styles from './feed-order-list.module.css'

interface IProps {
  title: string,
  orders: TOrders,
  extraClass?: string
}

export const FeedOrderList: FC<IProps> = ({title, orders, extraClass}) => {
  return (
    <div className={`${styles.flex} ${styles.flexColumn}`}>
      <h2 className={'text text_type_main-medium'}>{title}</h2>
      <ul className={`${styles.created} mt-6 ${orders.length > 12 ? `${styles.scrollX} custom-scroll` : ''}`}>
        {
          orders.map(order => {
            return (
              <li key={order.number} className={`text text_type_digits-default ${extraClass}`}>
                {order.number}
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};
