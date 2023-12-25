import React from 'react';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-price.module.css';
import {useDispatch, useSelector} from "react-redux";
import {setContentModal} from "../../services/slices/modal-slice";
import {setOrder} from "../../services/slices/order-slice";
import {clearBurgerConstructor} from "../../services/slices/burger-slice";
import {useCreateOrderMutation} from "../../services/api/order-api";
import {useNavigate} from "react-router-dom";

function BurgerPrice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bun = useSelector(state => state.burger.bun);
  const ingredients = useSelector(state => state.burger.ingredients);

  const calcPrice = () => {
    return ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.price;
    }, bun ? bun.price * 2 : 0);
  }

  // Используем мутацию
  const [createOrder, {isLoading}] = useCreateOrderMutation();

  const handleOpenOrderDetails = async () => {
    try {
      const auth = localStorage.getItem('accessToken');

      if (!auth) {
        // Пользователь не авторизован, перенаправляем на страницу входа
        navigate('/login');
        return;
      }

      // Получаем только _id ингредиентов
      const ingredientIds = ingredients.map(ingredient => ingredient._id);
      ingredientIds.push(bun._id, bun._id);

      // Вызываем мутацию с массивом _id ингредиентов
      const response = await createOrder(ingredientIds);

      // Проверяем успешность заказа и обновляем UI соответственно
      if (response.data.success) {
        const {name, order} = response.data;
        dispatch(setOrder({name, order}))
        dispatch(setContentModal({
          componentName: 'OrderDetails',
          data: order.number
        }));
        dispatch(clearBurgerConstructor());
      } else {
        console.error('Order placement failed:', response.data);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  }

  return (
    <div className={styles.container}>
      <p className="text text_type_digits-medium mr-2">{calcPrice()}</p>
      <CurrencyIcon type="primary"/>
      <Button
        disabled={!bun || ingredients.length === 0 || isLoading}
        type="primary" size="large"
        htmlType='submit'
        onMouseDown={handleOpenOrderDetails}
        extraClass={'ml-10 mr-4'}
      >
        {isLoading ? 'Оформление заказа...' : 'Оформить заказ'}
      </Button>
    </div>
  );
}

export default BurgerPrice;
