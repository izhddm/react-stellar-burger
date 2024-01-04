import React, {FC} from 'react';
import styles from './burger-constructor.module.css'
import BurgerPrice from "../burger-price/burger-price";
import {useDispatch, useSelector} from "react-redux";
import {addIngredient, setBun} from "../../services/slices/burger-slice";
import {useDrop} from "react-dnd";
import ConstructorBun from "../constructor-bun/constructor-bun";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const constructorBun = useSelector(state => state.burger.bun);
  // @ts-ignore
  const constructorIngredients: any[] = useSelector(state => state.burger.ingredients);

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
          {!constructorBun && (
            <p className={`${styles.select} text text_type_main-default`}>Выберите булочку</p>
          )}
          {constructorBun && (<ConstructorBun type={'top'}/>)}

          {constructorIngredients.length === 0 && (
            <p
              className={`${styles.select} text text_type_main-default`}>Выберите
              соусы и начинки</p>
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
      </div>

      <div className={styles.price + ' mb-6'}>
        <BurgerPrice/>
      </div>
    </section>
  );
}

export default BurgerConstructor;
