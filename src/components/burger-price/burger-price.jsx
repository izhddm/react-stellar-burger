import React from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-price.module.css';

function BurgerPrice(props) {
  return (
    <div className={styles.container}>
      <p className="text text_type_digits-medium mr-2">1000</p>
      <CurrencyIcon type="primary" />
    </div>
  );
}

export default BurgerPrice;
