import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import React from "react";
import BurgerPrice from "../burger-price/burger-price";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

function App() {
  const [contentModal, setContentModal] = React.useState(null);

  const closeModal = () => {
    setContentModal(null);
  };

  const handleOpenIngredientDetails = (e, element) => {
    setContentModal(() => <IngredientDetails element={element}/>);
  }

  const handleOpenOrderDetails = () => {
    setContentModal(() => <OrderDetails/>)
  }

  return (
    <div className={styles.container}>
      <AppHeader/>
      <main className={styles.main}>
        <section className={styles.ingredients} aria-label={`Бургер ингредиенты`}>
          <h1 className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
          <BurgerIngredients handleOpenIngredientDetails={handleOpenIngredientDetails}/>
        </section>

        <section className={styles.constructor + ` ml-10`} aria-label={`Бургер конструктор`}>
          <BurgerConstructor/>
          <div className={styles.price + ' mt-10'}>
            <BurgerPrice/>
            <Button
              type="primary" size="medium"
              htmlType='submit'
              onMouseDown={handleOpenOrderDetails}
            >
              Оформить заказ
            </Button>
          </div>
        </section>
      </main>
      {contentModal && <Modal onClick={closeModal} onClose={closeModal}>
        {contentModal}
      </Modal>}
    </div>
  );
}

export default App;
