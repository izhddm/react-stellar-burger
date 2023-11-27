import React from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'
import {listIngredients} from "../../utils/data";
import BurgerPrice from "../burger-price/burger-price";
import PropTypes from "prop-types";

function BurgerConstructor({setContentModal}) {
  const calcPrice = () => {
    return listIngredients.ingredients.reduce((acc, ingredient) => {
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
            text={`${listIngredients.bun.name} (верх)`}
            price={listIngredients.bun.price}
            thumbnail={listIngredients.bun.image_mobile}
            extraClass={styles.element_color + ' mr-4'}
          />
        </div>
        <div className={styles.ingredients + ' custom-scroll'}>
          {
            listIngredients.ingredients.map((element, index) => {
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
            text={`${listIngredients.bun.name} (низ)`}
            price={listIngredients.bun.price}
            thumbnail={listIngredients.bun.image_mobile}
            extraClass={styles.element_color + ' mr-4'}
          />
        </div>
      </div>

      <div className={styles.price + ' mb-6'}>
        <BurgerPrice price={calcPrice()} setContentModal={setContentModal}/>
      </div>
    </section>
  );
}

BurgerPrice.propTypes = {
  setContentModal: PropTypes.func.isRequired
}

export default BurgerConstructor;
