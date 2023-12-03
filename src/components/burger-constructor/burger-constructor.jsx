import React from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'
import BurgerPrice from "../burger-price/burger-price";
import {useSelector} from "react-redux";

function BurgerConstructor() {
  const burgerIngredients = useSelector(state => state.burger);

  return (
    <section className={styles.section} aria-label="Бургер конструктор">
      <div className={styles.burger}>
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
            <p className={styles.select + ' text text_type_main-default'}>По меньшей мере должен быть выбран один соус или начинка. Пожалуйста, выберите...</p>
          ) : (
            burgerIngredients.ingredients.map((element, index) => (
              <div key={index + '.' + element._id} className={styles.element}>
                <div className={styles.dnd}></div>
                <ConstructorElement
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image_mobile}
                  extraClass={styles.element_color + ' mr-2'}
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
