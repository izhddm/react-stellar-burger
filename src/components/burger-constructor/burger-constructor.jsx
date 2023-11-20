import React from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'

function BurgerConstructor(props) {
    return (
        <div className={styles.components + ` mt-25 ml-8`}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={200}
                thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            />
            <div className={styles.ingredients}>
                <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"

                />
                <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"

                />
                <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"

                />
                <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"

                />
                <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"

                />
                <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"

                />
                <ConstructorElement
                    text="Краторная булка N-200i (верх)"
                    price={50}
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"

                />
            </div>

            <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={200}
                thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"

            />
        </div>
    );
}

export default BurgerConstructor;
