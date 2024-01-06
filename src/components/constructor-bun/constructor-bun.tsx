import React, {FC} from 'react';
import styles from "../constructor-bun/constructor-bun.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../../hooks/useAppSelector";

interface IProps {
  extraClass?: string,
  type: 'top' | 'bottom'
}

const ConstructorBun: FC<IProps> = ({extraClass, type}) => {
  const bun = useAppSelector(state => state.burger.bun)!

  return (
    <div className={`${styles.container} ${extraClass}`}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={`${bun.name} ${type === 'top' ? '(верх)' : '(низ)'}`}
        price={bun.price}
        thumbnail={bun.image_mobile!}
        extraClass={styles.element_background + ' mr-4'}
      />
    </div>
  );
}

export default ConstructorBun;
