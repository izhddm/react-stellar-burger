import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import React from "react";
import BurgerPrice from "../burger-price/burger-price";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

function App() {
  return (
    <div className={styles.container}>
      <AppHeader/>
      <main className={styles.main}>
        <section className={styles.ingredients} aria-label={`Бургер ингредиенты`}>
          <h1 className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
          <BurgerIngredients/>
        </section>

        <section className={styles.constructor + ` ml-10`} aria-label={`Бургер конструктор`}>
          <BurgerConstructor/>
          <div className={styles.price+' mt-10'}>
            <BurgerPrice/>
            <Button
              type="primary" size="medium"
              htmlType='submit'>
              Оформить заказ
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
