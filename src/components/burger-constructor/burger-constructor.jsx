import React from 'react';
import styles from './burger-constructor.module.css'
import BurgerPrice from "../burger-price/burger-price";
import {useDispatch, useSelector} from "react-redux";
import {addIngredient, setBun} from "../../services/slices/burgerSlice";
import {useDrop} from "react-dnd";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";
import ConstructorBun from "../constructor-bun/constructor-bun";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const constructorIngredients = useSelector(state => state.burger.ingredients);

  // Принимаем то что бросил пользователь при перетаскивании
  const [{isOver}, drop] = useDrop({
    accept: 'INGREDIENT',
    drop: (item) => {
      if (item.type === 'bun') {
        dispatch(setBun(item))
      } else {
        dispatch(addIngredient(item))
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    })
  })

  return (
    <section className={styles.section} aria-label="Бургер конструктор">
      <div className={`${styles.burger} ${isOver ? styles.drop_zone : ''}`} ref={drop}>
        <ConstructorBun type={'top'} extraClass={'mt-25'}/>
        <div className={styles.ingredients + ' custom-scroll'}>
          {constructorIngredients.length === 0 ? (
            <p className={styles.select + ' text text_type_main-default'}>По меньшей мере должен быть выбран один соус
              или начинка. Пожалуйста, выберите...</p>
          ) : (
            constructorIngredients.map((element, index) => (
             <ConstructorIngredient key={element.uuid} element={element} index={index}/>
            ))
          )}
        </div>
        <ConstructorBun type={'bottom'}/>
      </div>

      <div className={styles.price + ' mb-6'}>
        <BurgerPrice/>
      </div>
    </section>
  );
}

export default BurgerConstructor;
