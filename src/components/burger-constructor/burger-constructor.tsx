import React, {FC} from 'react';
import styles from './burger-constructor.module.css'
import BurgerPrice from "../burger-price/burger-price";
import {useDispatch, useSelector} from "react-redux";
import {addIngredient, setBun} from "../../services/slices/burger-slice";
import {useDrop} from "react-dnd";
import ConstructorBun from "../constructor-bun/constructor-bun";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";
import {RootState} from "../../services/store/store";
import {TIngredientConstructor} from "../../types/types";

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();

  const bun = useSelector<RootState, TIngredientConstructor | null>(state => state.burger.bun);
  const ingredients = useSelector<RootState, TIngredientConstructor[]>(state => state.burger.ingredients);

  // Принимаем то, что бросил пользователь при перетаскивании
  const [{isOver}, drop] = useDrop({
    accept: 'INGREDIENT',
    drop: (item) => {
      // @ts-ignore
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
      <div className={`mt-25 ${styles['flex-expand']} ${isOver ? styles.dropzone : ''}`} ref={drop}>
        <div className={`${styles.burger}`}>
          {!bun && (
            <p className={`${styles.select} text text_type_main-default`}>Выберите булочку</p>
          )}
          {bun && (<ConstructorBun type={'top'}/>)}

          {ingredients.length === 0 && (
            <p
              className={`${styles.select} text text_type_main-default`}>Выберите
              соусы и начинки</p>
          )}
          {
            ingredients.length > 0 && (<div className={styles.ingredients + ' custom-scroll'}>
              {ingredients.map((element, index) => (
                <ConstructorIngredient key={element.uuid} element={element} index={index}/>
              ))}
            </div>)
          }
          {bun && <ConstructorBun type={'bottom'}/>}
        </div>
      </div>

      <div className={styles.price + ' mb-6'}>
        <BurgerPrice/>
      </div>
    </section>
  );
}

export default BurgerConstructor;
