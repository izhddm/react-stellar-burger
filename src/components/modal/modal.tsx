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
  backNavigate: boolean
}

const Modal: FC<ModalProps> = ({componentName, backNavigate = false}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const name = useAppSelector(state => state.modal.componentName);
  const DynamicComponent = modalComponent[componentName ?? name ?? ''];
  const dynamicComponent = DynamicComponent ? (<DynamicComponent/>) : null;

  const modalsElement = document.getElementById('modals');

  React.useEffect(() => {
    setIsModalOpen(!!dynamicComponent);
  }, [dynamicComponent]);

  const closeModal = () => {
    if (backNavigate) {
      navigate(-1);
    }
    dispatch(clearContentModal());
  };

  // Остановить всплытие события, чтобы не срабатывало событие на внешнем элементе
  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  React.useEffect(() => {
    const closeByEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', closeByEsc);

    return () => document.removeEventListener('keydown', closeByEsc);
  }, [isModalOpen]);

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
