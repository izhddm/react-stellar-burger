import React from 'react';
import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";

function ModalOverlay({onMouseDown, children}) {
  return (
    <div className={styles.overlay} onMouseDown={onMouseDown}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  onMouseDown: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}

export default ModalOverlay;
