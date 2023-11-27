import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import React from "react";
import Modal from "../modal/modal";
import {baseUrl} from "../../utils/constants";
import {request} from "../../utils/utils";

function App() {
  const [contentModal, setContentModal] = React.useState(null);
  const [listIngredients, setListIngredients] = React.useState(null);

  // Получим ингредиенты с сервера при монтировании
  React.useEffect(() => {
    request(baseUrl + '/ingredients')
      .then(json => {
        setListIngredients(json.data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className={styles.container}>
      <AppHeader/>
      <main className={styles.main}>
        {listIngredients &&
          <BurgerIngredients data={listIngredients} setContentModal={setContentModal}/>
        }
        <BurgerConstructor setContentModal={setContentModal}/>
      </main>
      {contentModal && <Modal setContentModal={setContentModal}>
        {contentModal}
      </Modal>}
    </div>
  );
}

export default App;
