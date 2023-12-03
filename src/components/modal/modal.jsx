import React from 'react';
import {createPortal} from "react-dom";
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {clearContentModal} from "../../services/slices/modalSlice";

function Modal() {
  const dispatch = useDispatch();

  const contentModal = useSelector(state => state.modal.contentModal);

  const closeModal = () => {
   dispatch(clearContentModal());
  };

  // Остановить всплытие события, чтобы не срабатывало событие на внешнем элементе
  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  React.useEffect(() => {
    // Закрытие по ESC
    const closeByEsc = ((e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    });

    //События на нажатие кнопок
    document.addEventListener('keydown', closeByEsc);

    return () => document.removeEventListener('keydown', closeByEsc)
  }, []);

  return contentModal ? (
      createPortal(
          <ModalOverlay onMouseDown={closeModal}>
            <div className={styles.modal} onMouseDown={handleStopPropagation}>
              {contentModal}
              <div className={styles.close}>
                <CloseIcon onClick={closeModal} type="primary" />
              </div>
            </div>
          </ModalOverlay>,
          document.getElementById('modals')
      )
  ) : null;
}

export default Modal;
