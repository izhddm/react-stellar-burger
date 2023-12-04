import React from 'react';
import styles from './ingredient.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropType} from "../../utils/prop-types";
import {useDispatch} from "react-redux";
import {setContentModal} from "../../services/slices/modalSlice";
import IngredientDetails from "../ingredient-details/ingredient-details";

function Ingredient({element}) {
  const dispatch = useDispatch();

  const handleOpenIngredientDetails = (element) => {
    dispatch(setContentModal(<IngredientDetails element={element}/>))
  }

  return (
    <div className={styles.container} key={element._id} onClick={(e) => {
      handleOpenIngredientDetails(e, element)
    }}>
    <div className={styles.container} key={element._id} onClick={() => {
      handleOpenIngredientDetails(element)
      {element.count && element.count > 0 &&
        <div className={styles.counter}>
          <Counter count={element.count} size="default"/>
        </div>}
      <img className={styles.image}
           src={element.image}
           alt={element.name}
      />
      <div className={styles.price + " mt-2 mb-2"}>
        <p className="text text_type_digits-default mr-2">
          {element.price}
        </p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className="text text_type_main-default">
        {element.name}
      </p>
    </div>
  );
}

Ingredient.propTypes = {
  element: ingredientPropType.isRequired,
}

export default Ingredient;
