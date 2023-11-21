import React from 'react';
import styles from './burger-ingredient.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredient({element, handleOpenIngredientDetails}) {
  return (
    <div className={styles.container} key={element._id} onClick={(e) => {
      handleOpenIngredientDetails(e, element)
    }}>
      {element.count && element.count > 0 &&
        <div className={styles.counter}>
          <Counter count={1} size="default"/>
        </div>}
      <img className={styles.image}
           src={element.image}
           alt={element.name}
      />
      <div className={styles.price + ` mt-2 mb-2`}>
        <p className="text text_type_digits-default mr-2">
          {element.price}
        </p>
        <CurrencyIcon type={"primary"}/>
      </div>
      <p className="text text_type_main-default">
        {element.name}
      </p>
    </div>
  );
}

export default BurgerIngredient;
