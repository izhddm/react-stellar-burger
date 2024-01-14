import React, {FC} from "react";
import {TIngredient} from "../types/types";
import {BurgerCost} from "../components/burger-cost/burger-cost";
import styles from  './order-info-ingredient.module.css'

interface IProps {
  count: number,
  ingredient: TIngredient,
  extraClass?: string,
}

export const OrderInfoIngredient: FC<IProps> = ({count, ingredient, extraClass}) => {
  return (
    <div className={`${styles.flex} ${extraClass}`}>
      <div className={styles.circles}>
        <img
          className={styles.image}
          src={ingredient.image_mobile}
          alt={ingredient.name}
          title={ingredient.name}
        />
      </div>
      <h3 className={`${styles.alignLeft} text text_type_main-default`}>{ingredient.name}</h3>
      <BurgerCost className={'text text_type_digits-default mr-2'} value={`${count} х ${ingredient.price}`}/>
    </div>
  );
};
