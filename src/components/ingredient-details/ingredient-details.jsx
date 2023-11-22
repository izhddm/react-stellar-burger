import React from 'react';
import styles from './ingredient-details.module.css'
import {ingredientPropType} from "../../utils/prop-types";

function IngredientDetails({element}) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title + ' text text_type_main-large'}>Детали ингредиента</h2>

      <div className={styles.details}>
        <img className={styles.image}
             id={element._id}
             src={element.image_large}
             alt={element.name}
        />
        <h3 className={styles.subtitle + ' text text_type_main-medium'}>{element.name}</h3>
        <div className={styles.caption}>
          <p className="text text_type_main-small"> Калории,ккал </p>
          <p className="text text_type_main-small"> Белки, г </p>
          <p className="text text_type_main-small"> Жиры, г </p>
          <p className="text text_type_main-small"> Углеводы, г </p>
          <p className="text text_type_digits-default">{element.calories}</p>
          <p className="text text_type_digits-default">{element.proteins}</p>
          <p className="text text_type_digits-default">{element.fat}</p>
          <p className="text text_type_digits-default">{element.carbohydrates}</p>
        </div>
      </div>
    </div>

  );
}

IngredientDetails.propTypes = {
  element: ingredientPropType.isRequired,
}

export default IngredientDetails;