import styles from "./ActionModal.module.scss";
import { X } from "lucide-react";
import classNames from "classnames";
import { motion } from "motion/react";

export interface ActionModalProps {
  isOpen: boolean;
  type: "action" | "chat";
  handleClose: () => void;
  children: React.ReactNode;
}

export function ActionModal({ isOpen, handleClose, type = "action", children }: ActionModalProps) {
  function handleCloseModal() {
    handleClose();
  }

  console.log(type)

  return (
    <motion.div
      className={classNames(styles.wrp, {
        [styles.notVisible]: !isOpen,
        [styles.chatWrp]: type === "chat",
      })}
      transition={{
        duration: type !== "chat" ? 1 : 0
      }}
      animate={{
        display: isOpen ? "flex" : "none",
      }}
    >
      <div className={styles.content}>
        {
          type !== "chat" && 
            <X 
              className={styles.close}
              onClick={handleCloseModal}
            />
        }
        {children}
      </div>
    </motion.div>
  );
}