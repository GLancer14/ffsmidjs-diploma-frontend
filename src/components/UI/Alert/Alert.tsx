import { useEffect } from "react";
import ReactPortal from "../ReactPortal/ReactPortal";
import styles from "./Alert.module.scss";
import classNames from "classnames";

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
            }, 3000);
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
                <p className="text small">{children}</p>
            </div>
        </ReactPortal>
    );
};

export default Alert;
