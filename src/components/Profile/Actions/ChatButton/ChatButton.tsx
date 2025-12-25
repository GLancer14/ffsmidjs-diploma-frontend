import { MessageSquare, X } from "lucide-react";
import { useContext, useState } from "react";
import styles from "./ChatButton.module.scss";
import { useAppSelector } from "../../../../hooks/reduxHook";
import { ActionModalContext } from "../../../../context/ActionModalContext";
import { Chat } from "../../Chat/Chat";
import type { Chat as ChatType } from "../../../../store/reducers/observedUserProfileSlice";

export function ChatButton() {
  const { closeActionModal, showActionModal } = useContext(ActionModalContext);
  const user = useAppSelector(state => state.userReducer);
  const observedUserProfile = useAppSelector(state => state.observedUserProfileReducer);
  const [chatBtnVisibility, setChatBtnVisibility] = useState(false);
  const [currentChat, setCurrentChat] = useState<ChatType>();

  return (
    <button 
        className={styles.chatBtn}
        type="button"
        onClick={() => {
          chatBtnVisibility
            ? closeActionModal!()
            // : showActionModal!(<Chat chat={observedUserProfile.chat} />, "chat");
            : showActionModal!(<Chat />, "chat");
          setChatBtnVisibility(!chatBtnVisibility);
        }}
      >
        {
          chatBtnVisibility
            ? <X />
            : <MessageSquare />
        }
      </button>
  );
}