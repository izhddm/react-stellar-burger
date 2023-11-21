import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css'
import IngredientCategory from "../ingredient-category/ingredient-category";

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one');

  // Категории ингредиентов
  const categories = [
    {value: 'one', label: 'Булки', type: 'bun'},
    {value: 'two', label: 'Соусы', type: 'sauce'},
    {value: 'three', label: 'Начинки', type: 'main'},
  ];

  return (
    <>
      <div className={styles.tab}>
        {categories.map((category) => (
          <Tab
            key={category.value}
            value={category.value}
            active={current === category.value}
            onClick={setCurrent}
          >
            {category.label}
          </Tab>
        ))}
      </div>

      <div className={styles.ingredients + ' custom-scroll'}>
        {categories.map((category) => (
          <IngredientCategory {...category}/>
        ))}
      </div>
    </>
  );
}

export default BurgerIngredients;
