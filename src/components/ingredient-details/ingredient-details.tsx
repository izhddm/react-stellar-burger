import React, {FC} from 'react';
import styles from './ingredient-details.module.css'
import {useParams} from "react-router-dom";
import {useGetIngredientsQuery} from "../../services/api/ingredient-api";

const IngredientDetails: FC = () => {
  const {id} = useParams()

  // Получения списка всех ингредиентов
  const {data: ingredients, isLoading: isLoadingIngredients} = useGetIngredientsQuery();

  if (isLoadingIngredients) {
    return <div>Loading...</div>
  }

  // найдем элемент по id
  const element = ingredients?.find((el) => el._id === id) ?? null;

  return (
    element && <div className={styles.container}>
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

export default IngredientDetails;
