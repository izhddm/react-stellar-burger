import React from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'
import {ingredientsCart} from "../../utils/data";
import BurgerPrice from "../burger-price/burger-price";

function BurgerConstructor() {
  const calcPrice = () => {
    return ingredientsCart.ingredients.reduce((acc, ingredient) => {
      if (ingredient.type === 'bun') {
        return acc + ingredient.price * 2;
      } else {
        return acc + ingredient.price;
      }
    }, 0);
  }

  return (
    <section className={styles.section} aria-label="Бургер конструктор">
      <div className={styles.burger}>
        <div className={styles.element + ' mt-25'}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${ingredientsCart.bun.name} (верх)`}
            price={ingredientsCart.bun.price}
            thumbnail={ingredientsCart.bun.image_mobile}
            extraClass={styles.element_color + ' mr-4'}
          />
        </div>
        <div className={styles.ingredients + ' custom-scroll'}>
          {
            ingredientsCart.ingredients.map((element, index) => {
              return (
                <div key={index + '.' + element._id} className={styles.element}>
                  <div className={styles.dnd}></div>
                  <ConstructorElement
                    text={element.name}
                    price={element.price}
                    thumbnail={element.image_mobile}
                    extraClass={styles.element_color + ' mr-2'}
                  />
                </div>
              );
            })
          }
        </div>
        <div className={styles.element}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${ingredientsCart.bun.name} (низ)`}
            price={ingredientsCart.bun.price}
            thumbnail={ingredientsCart.bun.image_mobile}
            extraClass={styles.element_color + ' mr-4'}
          />
        </div>
      </div>

      <div className={styles.price + ' mb-6'}>
        <BurgerPrice price={calcPrice()} />
      </div>
    </section>
  );
}

export default BurgerConstructor;
