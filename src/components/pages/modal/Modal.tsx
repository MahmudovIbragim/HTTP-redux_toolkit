import { FC, ReactNode, useEffect, useState } from "react";
import scss from "./Modal.module.scss";
import ReactDOM from "react-dom";

interface TypeModal {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<TypeModal> = ({ isOpen, onClose, children }) => {
  const [isBorwser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = isOpen && (
    <div className={scss.modal} onClick={() => onClose()}>
      <div className={scss.modalContent}>{children}</div>
    </div>
  );
  if (!isBorwser) return null;

  const portalRoot = document.getElementById("root_portal");

  return portalRoot ? ReactDOM.createPortal(modalContent, portalRoot) : null;
};

export default Modal;
