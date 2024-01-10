import {FC} from "react";
import {CardOrder} from "../../card-order/card-order";
import styles from "./profile-order-page.module.css"

export const ProfileOrderPage: FC = () => {
  return (
    <div className={`${styles.content} ml-10 mt-9 pt-2 custom-scroll`}>
      <CardOrder showStatus={true}/>
    </div>
  );
};
