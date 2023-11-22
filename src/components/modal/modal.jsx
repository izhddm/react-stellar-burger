import React from 'react';
import {createPortal} from "react-dom";
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function Modal({onClick, onClose, children}) {
  // Остановить всплытие события, чтобы не срабатывало событие на внешнем элементе
  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  React.useEffect(() => {
    // Закрытие по ESC
    const closeByEsc = ((e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    });

    //События на нажатие кнопок
    document.addEventListener('keydown', closeByEsc);

    return () => document.removeEventListener('keydown', closeByEsc)
  }, []);

  return createPortal(
    <ModalOverlay onMouseDown={onClick}>
      <div className={styles.modal} onMouseDown={handleStopPropagation}>
        {children}
        <div className={styles.close}>
          <CloseIcon onClick={onClick} type="primary"/>
        </div>
      </div>
    </ModalOverlay>,
    document.getElementById('modals')
  );
}

export default Modal;
