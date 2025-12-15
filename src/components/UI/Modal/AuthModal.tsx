import styles from "./AuthModal.module.scss";
import { Login } from "../../Login/Login";
import { Register } from "../../Register/Register";
import { X } from "lucide-react";

export interface ModalProps {
  type: string;
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthModalType: React.Dispatch<React.SetStateAction<string>>;
}

export function AuthModal({
  visibility,
  setVisibility,
  type,
  setAuthModalType
}: ModalProps) {
  function handleCloseModal() {
    setVisibility(false);
  }

  return (
    <div
      className={styles.wrp}
      style={{
        display: visibility ? "flex" : "none"
      }}
    >
      <div className={styles.content}>
        <X 
          className={styles.close}
          onClick={handleCloseModal}
        />
        {(type === "login")
          ? <Login setAuthModalType={setAuthModalType} />
          : <Register setAuthModalType={setAuthModalType} />
        }
      </div>
    </div>
  );
}