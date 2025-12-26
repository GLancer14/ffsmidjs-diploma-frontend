import { useEffect } from "react";
import ReactPortal from "../ReactPortal/ReactPortal";
import styles from "./Alert.module.scss";
import classNames from "classnames";
import { CircleAlert, CircleCheck, X } from "lucide-react";

interface AlertProps {
  children: React.ReactNode;
  type: "error" | "success";
  isOpen: boolean;
  handleClose: () => void;
}

export function Alert({
  children,
  type = "error",
  isOpen,
  handleClose,
}: AlertProps) {
  useEffect(() => {
    let id: number;
    if (isOpen) {
      id = setTimeout(() => {
        handleClose();
      }, 5000);
    }

    return () => {
      clearTimeout(id);
    };
  }, [isOpen, handleClose]);

  return (
    <ReactPortal>
      <div
        className={classNames(
          styles.container,
          {
            [styles.error]: type === "error",
          },
          {
            [styles.success]: type === "success",
          },
          {
            [styles.active]: isOpen,
          },
        )}
      >
        {
          type !== "error" 
            ? <CircleCheck className={styles.check} />
            : <CircleAlert className={styles.alert} />
        }
        <p className={styles.text}>{children}</p>
        <X className={styles.close} onClick={() => handleClose()} />
      </div>
    </ReactPortal>
  );
};

export default Alert;
