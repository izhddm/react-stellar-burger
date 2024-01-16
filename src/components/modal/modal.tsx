import React, {FC} from 'react';
import {createPortal} from "react-dom";
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {clearContentModal} from "../../services/slices/modal-slice";
import {useNavigate} from "react-router-dom";
import {modalComponent} from "../../types/types";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";

interface ModalProps {
  componentName?: string,
}

const Modal: FC<ModalProps> = ({componentName}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const name = useAppSelector(state => state.modal.componentName);
  const DynamicComponent = modalComponent[componentName ?? name ?? ''];
  const dynamicComponent = DynamicComponent ? (<DynamicComponent/>) : null;

  const modalsElement = document.getElementById('modals');

  const closeModal = () => {
    navigate(-1);
    dispatch(clearContentModal());
  };

  // Остановить всплытие события, чтобы не срабатывало событие на внешнем элементе
  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  React.useEffect(() => {
    // Закрытие по ESC
    const closeByEsc = ((e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    });

    //События на нажатие кнопок
    document.addEventListener('keydown', closeByEsc);

    return () => document.removeEventListener('keydown', closeByEsc)
  }, []);

  return dynamicComponent && modalsElement ? (
    createPortal(
      <ModalOverlay onMouseDown={closeModal}>
        <div className={styles.modal} onMouseDown={handleStopPropagation}>
          {dynamicComponent}
          <div className={styles.close}>
            <CloseIcon onClick={closeModal} type="primary"/>
          </div>
        </div>
      </ModalOverlay>,
      modalsElement
    )
  ) : null;
}

export default Modal;
