import React from 'react';
import styles from "../constructor-bun/constructor-bun.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

function ConstructorBun({extraClass, type}) {
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

ConstructorBun.propTypes = {
  extraClass: PropTypes.string,
  type: PropTypes.string.isRequired
}
export default ConstructorBun;
