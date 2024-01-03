import React, {FC} from 'react';
import styles from "../constructor-ingredient/constructor-ingredient.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {removeIngredient, swapIngredients} from "../../services/slices/burger-slice";
import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";

interface ConstructorIngredientProps {
  element: any,
  index: number
}

const ConstructorIngredient: FC<ConstructorIngredientProps> = ({element, index}) => {
  const dispatch = useDispatch();

  // @ts-ignore
  const burgerIngredients = useSelector(state => state.burger.ingredients);
  const findIndex = (item: any) => burgerIngredients.indexOf(item);

  const [{isDragging}, dragRef] = useDrag({
    type: 'SWAP_INGREDIENT',
    item: {ingredient: element},
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, dropRef] = useDrop({
    accept: 'SWAP_INGREDIENT',
    // @ts-ignore
    hover({ingredient}) {
      if (ingredient.uuid === element.uuid) return;

      dispatch(swapIngredients({
        indexFrom: findIndex(ingredient),
        indexTo: index,
        ingredient: ingredient,
      }))
    }
  });

  return (
    <div className={`${isDragging ? styles.container + ' ' + styles.dragging : styles.container}`}
         ref={node => dropRef(dragRef(node))}>
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

export default ConstructorIngredient;
