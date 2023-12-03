import React from 'react';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-price.module.css';
import OrderDetails from "../order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {setContentModal} from "../../services/slices/modalSlice";

function BurgerPrice() {
  const dispatch = useDispatch();

  const bun = useSelector(state => state.burger.bun);
  const ingredients = useSelector(state => state.burger.ingredients);

  const calcPrice = () => {
    return ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.price;
    }, bun ? bun.price * 2 : 0);
  }

  const handleOpenOrderDetails = () => {
    dispatch(setContentModal(<OrderDetails/>));
  }

  return (
    <div className={styles.container}>
      <p className="text text_type_digits-medium mr-2">{calcPrice()}</p>
      <CurrencyIcon type="primary"/>
      <Button
        disabled={!bun || ingredients.length === 0}
        type="primary" size="large"
        htmlType='submit'
        onMouseDown={handleOpenOrderDetails}
        extraClass={'ml-10 mr-4'}
      >
        Оформить заказ
      </Button>
    </div>
  );
}

export default BurgerPrice;
