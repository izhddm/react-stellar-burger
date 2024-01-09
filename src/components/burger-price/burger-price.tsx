import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC} from "react";
import styles from './burger-price.module.css'

interface IProps {
  price: number
}

export const BurgerPrice: FC<IProps> = ({price}) => {
  return (
    <div className={styles.container}>
      <p className="text text_type_digits-medium mr-2">{price}</p>
      <CurrencyIcon type="primary"/>
    </div>
  );
};
