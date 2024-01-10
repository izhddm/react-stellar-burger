import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC} from "react";
import styles from './burger-cost.module.css'

interface IProps {
  value: number
}

export const BurgerCost: FC<IProps> = ({value}) => {
  return (
    <div className={styles.container}>
      <p className="text text_type_digits-medium mr-2">{value}</p>
      <CurrencyIcon type="primary"/>
    </div>
  );
};
