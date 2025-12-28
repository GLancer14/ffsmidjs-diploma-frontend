import React, { createContext, useState } from "react";
import Alert from "../components/UI/Alert/Alert.tsx";

type ModalStateProps = {
  children?: React.ReactNode;
  showAlert?: (
    content: React.ReactNode | string,
    type?: "error" | "success"
  ) => void;
};

export const AlertContext = createContext<ModalStateProps>({} as ModalStateProps);

export function AlertState ({ children }: ModalStateProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [currContent, setCurrContent] = useState<React.ReactNode>("");
  const [currType, setCurrType] = useState<"error" | "success">(
      "error"
  );

  const showAlert = (
    content: React.ReactNode | string,
    type?: "error" | "success"
  ) => {
    setIsOpened(true);
    setCurrContent(content);
    setCurrType(type ? type : "error");
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      <Alert
        type={currType}
        children={currContent}
        isOpen={isOpened}
        handleClose={() => setIsOpened(false)}
      />
      {children}
    </AlertContext.Provider>
  );
};

export default AlertState;
