import React from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'
import BurgerPrice from "../burger-price/burger-price";
import {useDispatch, useSelector} from "react-redux";
import {addIngredient, removeIngredient, setBun} from "../../services/slices/burgerSlice";
import {useDrop} from "react-dnd";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const burgerIngredients = useSelector(state => state.burger);

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
      dropItem: monitor.getItem()
    })
  })

  // Ингредиент, который перетаскивает пользователь для смены позиции в последовательности ингредиентов


  return (
    <section className={styles.section} aria-label="Бургер конструктор">
      <div className={`${styles.burger} ${isOver ? styles.drop_zone : ''}`} ref={drop}>
        <div className={styles.element + ' mt-25'}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${burgerIngredients.bun?.name} (верх)`}
            price={burgerIngredients.bun?.price}
            thumbnail={burgerIngredients.bun?.image_mobile}
            extraClass={styles.element_color + ' mr-4'}
          />
        </div>
        <div className={styles.ingredients + ' custom-scroll'}>
          {burgerIngredients.ingredients.length === 0 ? (
            <p className={styles.select + ' text text_type_main-default'}>По меньшей мере должен быть выбран один соус
              или начинка. Пожалуйста, выберите...</p>
          ) : (
            burgerIngredients.ingredients.map((element) => (
              <div key={element.uuid} className={styles.element}>
                <div className={styles.dnd}></div>
                <ConstructorElement
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image_mobile}
                  extraClass={styles.element_color + ' mr-2'}
                  handleClose={() => {
                    dispatch(removeIngredient({'uuid': element.uuid}))
                  }}
                />
              </div>
            ))
          )}
        </div>
        <div className={styles.element}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${burgerIngredients.bun?.name} (низ)`}
            price={burgerIngredients.bun?.price}
            thumbnail={burgerIngredients.bun?.image_mobile}
            extraClass={styles.element_color + ' mr-4'}
          />
        </div>
      </div>

      <div className={styles.price + ' mb-6'}>
        <BurgerPrice/>
      </div>
    </section>
  );
}

export default BurgerConstructor;
