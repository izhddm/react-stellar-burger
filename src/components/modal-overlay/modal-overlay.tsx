import React, {FC} from 'react';
import styles from './modal-overlay.module.css'

interface ModalOverlayProps {
  onMouseDown: () => void;
  children: React.ReactElement;
}

const ModalOverlay: FC<ModalOverlayProps> = ({onMouseDown, children}) => {
  return (
    <div className={styles.overlay} onMouseDown={onMouseDown}>
      {children}
    </div>
  );
}

export default ModalOverlay;
