import { useContext, useEffect } from "react";
import { getChatData, getClientChat } from "../../../api/supportChat";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { updateObservedUserChat, updateObservedUserProfile } from "../../../store/reducers/observedUserProfileSlice";
import styles from "./Profile.module.scss";
import { SocketContext } from "../../../context/SocketContext";
import { ChatButton } from "../Actions/ChatButton/ChatButton";

export function Profile({children}: {children: React.ReactNode}) {
  const dispatch = useAppDispatch();
  const { socket } = useContext(SocketContext);
  const user = useAppSelector(state => state.userReducer);
  const observedUserProfile = useAppSelector(state => state.observedUserProfileReducer);

  async function handleSubscribeToChatMessages() {
      if (user.id) {
        const chatData = await getClientChat();
        if (!chatData.status) {
          dispatch(updateObservedUserChat(chatData));
          socket?.emit("subscribeToChat", { chatId: chatData.id });
        }
      }
    }
  
    async function handleGetUserData() {
      if (user.id) {
        dispatch(updateObservedUserProfile({
          id: user.id,
          name: user.name,
          email: user.email,
          contactPhone: user.contactPhone,
          role: user.role,
        }))
      }
    }

    useEffect(() => {
      if (user.role === "client") {
        handleGetUserData();
        handleSubscribeToChatMessages();
      }

      return () => {
        socket?.emit("unSubscribeToChat", {
          chatId: observedUserProfile.chat.id
        });
      }
    }, []);
  return (
    <div className={styles.wrp}>
      {children}
      {
        user.role === "client" &&
         <ChatButton />
      }
    </div>
  );
}