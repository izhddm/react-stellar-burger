import React from 'react';
import styles from './burger-constructor.module.css'
import BurgerPrice from "../burger-price/burger-price";
import {useDispatch, useSelector} from "react-redux";
import {addIngredient, setBun} from "../../services/slices/burger-slice";
import {useDrop} from "react-dnd";
import ConstructorBun from "../constructor-bun/constructor-bun";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const constructorBun = useSelector(state => state.burger.bun);
  const constructorIngredients = useSelector(state => state.burger.ingredients);

  // Принимаем то, что бросил пользователь при перетаскивании
  const [{isOver}, drop] = useDrop({
    accept: 'INGREDIENT',
    drop: (item) => {
      if (item.type === 'bun') {
        dispatch(setBun(item));
      } else {
        dispatch(addIngredient(item));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <section className={styles.section} aria-label="Бургер конструктор">
      <div className={`${styles.burger} mt-25 ${isOver ? styles.drop_zone : ''}`} ref={drop}>
        {/*Выводим надпись с призывом выбрать булочку*/}
        {!constructorBun && (
          <p className={styles.select + ' text text_type_main-default'}>Выберите булочку</p>
        )}
        {constructorBun && (<ConstructorBun type={'top'}/>)}

        {/*Выводим надпись с призывом выбрать соусы и ингредиенты*/}
        {constructorIngredients.length === 0 && (
          <p className={styles.select + ' text text_type_main-default'}>Выберите соусы и начинки</p>
        )}
        {
          constructorIngredients.length > 0 && (<div className={styles.ingredients + ' custom-scroll'}>
            {constructorIngredients.map((element, index) => (
              <ConstructorIngredient key={element.uuid} element={element} index={index}/>
            ))}
          </div>)
        }
        {constructorBun && <ConstructorBun type={'bottom'}/>}
      </div>

      <div className={styles.price + ' mb-6'}>
        <BurgerPrice/>
      </div>
    </section>
  );
}

export default BurgerConstructor;
