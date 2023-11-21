import React from 'react';
import styles from './ingredient.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function Ingredient({element}) {
  return (
    <div className={styles.container} key={element._id}>
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

export default Ingredient;
