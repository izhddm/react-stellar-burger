import React, {FC} from 'react';
import styles from "../constructor-bun/constructor-bun.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";

interface ConstructorBunProps {
  extraClass?: string,
  type: 'top' | 'bottom'
}

const ConstructorBun: FC<ConstructorBunProps> = ({extraClass, type}) => {
  // @ts-ignore
  const bun = useSelector(state => state.burger.bun)

  return (
    <div className={`${styles.container} ${extraClass}`}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={`${bun.name} ${type === 'top' ? '(верх)' : '(низ)'}`}
        price={bun.price}
        thumbnail={bun.image_mobile}
        extraClass={styles.element_background + ' mr-4'}
      />
    </div>
  );
}

export default ConstructorBun;
