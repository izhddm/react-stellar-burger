import React from 'react';
import {createPortal} from "react-dom";
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {clearContentModal} from "../../services/slices/modal-slice";
import {modalComponent} from "../../utils/constant";
import {useNavigate} from "react-router-dom";

function Modal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const componentName = useSelector(state => state.modal.componentName);
  const DynamicComponent = modalComponent[componentName];
  const dynamicComponent = DynamicComponent ? (<DynamicComponent/>) : null;

  const closeModal = () => {
    navigate(`/`, {'state': {'modal': false}});
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

  return dynamicComponent ? (
    createPortal(
      <ModalOverlay onMouseDown={closeModal}>
        <div className={styles.modal} onMouseDown={handleStopPropagation}>
          {dynamicComponent}
          <div className={styles.close}>
            <CloseIcon onClick={closeModal} type="primary"/>
          </div>
        </div>
      </ModalOverlay>,
      document.getElementById('modals')
    )
  ) : null;
}

export default Modal;
