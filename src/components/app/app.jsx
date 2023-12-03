import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import React from "react";
import Modal from "../modal/modal";

function App() {
    const [contentModal, setContentModal] = React.useState(null);

    return (
        <div className={styles.container}>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients setContentModal={setContentModal}/>
                <BurgerConstructor setContentModal={setContentModal}/>
            </main>
            {contentModal && <Modal setContentModal={setContentModal}>
                {contentModal}
            </Modal>}
        </div>
    );
}

export default App;
