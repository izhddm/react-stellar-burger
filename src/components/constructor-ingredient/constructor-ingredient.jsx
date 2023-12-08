import React from 'react';
import styles from "../constructor-ingredient/constructor-ingredient.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {removeIngredient} from "../../services/slices/burgerSlice";
import {ingredientPropType} from "../../utils/prop-types";
import {useDispatch} from "react-redux";

function ConstructorIngredient({element}) {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.sixPoints}></div>
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image_mobile}
        extraClass={styles.element_background + ' mr-2'}
        handleClose={() => {
          dispatch(removeIngredient({'uuid': element.uuid}))
        }}
      />
    </div>
  );
}

ConstructorIngredient.propTypes = {
  element: ingredientPropType.isRequired,
}
export default ConstructorIngredient;
