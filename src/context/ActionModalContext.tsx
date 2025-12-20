import React, { createContext, useState } from "react";
import Alert from "../components/UI/Alert/Alert.tsx";
import { ActionModal } from "../components/UI/ActionModal/ActionModal.tsx";

type ActionModalStateProps = {
    children?: React.ReactNode;
    showActionModal?: (
        content: React.ReactNode | string,
    ) => void;
    closeActionModal?: () => void;
};

export const ActionModalContext = createContext<ActionModalStateProps>({} as ActionModalStateProps);

export function ActionModalState ({ children }: ActionModalStateProps) {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [currContent, setCurrContent] = useState<React.ReactNode>("");

    const showActionModal = (
        content: React.ReactNode | string,
    ) => {
        setIsOpened(true);
        setCurrContent(content);
    };

    const closeActionModal = () => {
        setIsOpened(false);
    };


    return (
      <ActionModalContext.Provider value={{ showActionModal, closeActionModal }}>
          <ActionModal
              children={currContent}
              isOpen={isOpened}
              handleClose={() => setIsOpened(false)}
          />
          {children}
      </ActionModalContext.Provider>
    );
};

export default ActionModalState;
