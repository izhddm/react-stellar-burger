import React, {FC} from 'react';
import styles from "../constructor-ingredient/constructor-ingredient.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {removeIngredient, swapIngredients} from "../../services/slices/burger-slice";
import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {ICollectionPropsDrag, TIngredientConstructor} from "../../types/types";
import {RootState} from "../../services/store/store";

interface IProps {
  element: TIngredientConstructor,
  index: number
}

const ConstructorIngredient: FC<IProps> = ({element, index}) => {
  const dispatch = useDispatch();

  const ingredients = useSelector<RootState, TIngredientConstructor[]>(state => state.burger.ingredients);
  const findIndex = (item: TIngredientConstructor) => ingredients.indexOf(item);

  const [{isDragging}, dragRef] = useDrag<TIngredientConstructor, unknown, ICollectionPropsDrag>({
    type: 'SWAP_INGREDIENT',
    item: element,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, dropRef] = useDrop<TIngredientConstructor, unknown, unknown>({
    accept: 'SWAP_INGREDIENT',
    hover(item) {
      if (item.uuid === element.uuid) return;

      dispatch(swapIngredients({
        indexFrom: findIndex(item),
        indexTo: index,
        ingredient: item,
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
        thumbnail={element.image_mobile ?? ''}
        extraClass={styles.element_background + ' mr-2'}
        handleClose={() => {
          dispatch(removeIngredient({'uuid': element.uuid}))
        }}
      />
    </div>
  );
}

export default ConstructorIngredient;
