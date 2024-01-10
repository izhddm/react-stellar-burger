import React, {FC} from "react";
import {TIngredients} from "../../types/types";
import styles from './card-ingredients.module.css';

interface IProps {
  ingredients: TIngredients;
}

export const CardIngredients: FC<IProps> = ({ingredients}) => {
  const maxDisplayed = 6;
  const remainingIngredients = ingredients.slice(maxDisplayed);

  return (
    <ul className={styles.list}>
      {ingredients.slice(0, maxDisplayed).map((ingredient, index) => (

        <li className={styles.circles} key={index} style={{zIndex: maxDisplayed - index}}>
          <img
            className={`${styles.image} ${ingredients.length > maxDisplayed && maxDisplayed - 1 == index ? styles.opacity : ''}`}
            src={ingredient.image_mobile}
            alt={ingredient.name}
            title={ingredient.name}
          />
          {
            ingredients.length > maxDisplayed && maxDisplayed - 1 == index && (
              <div className={`${styles.count} text text_type_main-default`}>+{remainingIngredients.length}</div>
            )
          }
        </li>
      ))}

      {}
    </ul>
  );
};
