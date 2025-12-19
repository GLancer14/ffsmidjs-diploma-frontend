import styles from "./ActionModal.module.scss";
import { X } from "lucide-react";
import classNames from "classnames";
import { motion } from "motion/react";

export interface ActionModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

export function ActionModal({ isOpen, handleClose, children }: ActionModalProps) {
  function handleCloseModal() {
    handleClose();
  }

  return (
    <motion.div
      className={classNames(styles.wrp, {
        [styles.notVisible]: !isOpen
      })}
      transition={{
        duration: 1
      }}
      animate={{
        display: isOpen ? "flex" : "none",
      }}
    >
      <div className={styles.content}>
        <X 
          className={styles.close}
          onClick={handleCloseModal}
        />
        {children}
      </div>
    </motion.div>
  );
}