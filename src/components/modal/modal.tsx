import React, {FC} from 'react';
import {createPortal} from "react-dom";
import styles from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {clearContentModal} from "../../services/slices/modal-slice";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {modalComponent} from "../../types/types";
import {useAppSelector} from "../../hooks/useAppSelector";

interface ModalProps {
  component?: React.ReactNode,
  backNavigate: boolean
}

const Modal: FC<ModalProps> = ({component, backNavigate = false}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

   const name = useAppSelector(state => state.modal.componentName);
   const DynamicComponent = modalComponent[name ?? ''];
   const dynamicComponent = DynamicComponent ? (<DynamicComponent/>) : component;

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
