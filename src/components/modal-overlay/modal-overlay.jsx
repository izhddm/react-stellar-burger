import React from 'react';
import styles from './modal-overlay.module.css'

function ModalOverlay({onMouseDown, children}) {
    return (
        <div className={styles.overlay} onMouseDown={onMouseDown}>
            {children}
        </div>
    );
}

export default ModalOverlay;
