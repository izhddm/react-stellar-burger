import React from 'react';
import styles from './burger-ingredient.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropType} from "../../utils/prop-types";
import {useDispatch, useSelector} from "react-redux";
import {setContentModal} from "../../services/slices/modal-slice";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useDrag} from "react-dnd";
import {getCountIngredientFromConstructor} from "../../services/selectors"

function BurgerIngredient({element}) {
  const dispatch = useDispatch();

  const count = useSelector(getCountIngredientFromConstructor(element));

  const [{isDragging}, drag] = useDrag({
    type: 'INGREDIENT',
    item: element,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const handleOpenIngredientDetails = (element) => {
    dispatch(setContentModal(<IngredientDetails element={element}/>))
  }

  return (
    <div className={`${isDragging ? styles.container + ' ' + styles.dragging : styles.container}`}
         key={element._id}
         onClick={() => {
           handleOpenIngredientDetails(element)
         }}
         ref={drag}
         draggable>
      {count > 0 &&
        <div className={styles.counter}>
          <Counter count={count} size="default"/>
        </div>}
      <img className={styles.image}
           draggable={"false"}
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

BurgerIngredient.propTypes = {
  element: ingredientPropType.isRequired,
}

export default BurgerIngredient;
