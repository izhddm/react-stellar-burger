import React from 'react';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import styles from "./home-page.module.css";

function HomePage() {
  return (
    <main className={styles.page}>
      <BurgerIngredients/>
      <BurgerConstructor/>
    </main>
  );
}

export default HomePage;
