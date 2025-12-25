import { useContext, useEffect, useState, type ChangeEvent } from "react";
import styles from "./MyBooks.module.scss";
import { getUserById } from "../../../api/users";
import { ActionModalContext } from "../../../context/ActionModalContext";
import { ArrowBigLeft, BookMarked, MessageSquare, SquareCheck, X } from "lucide-react";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { findUserBookRents, getClientOwnRents } from "../../../api/bookRent";
import { type BookRentalResponseDto } from "../../../store/reducers/usersRentsSlice";
import { parseDateFromUTCToRu } from "../../../utils/parseRuDate";
import { EditProfile } from "../Actions/EditProfile/EditProfile";
import { resetObservedUserProfile, updateObservedUserChat, updateObservedUserProfile } from "../../../store/reducers/observedUserProfileSlice";
import { DeleteUser } from "../Actions/DeleteUser/DeleteUser";
import { Chat } from "../Chat/Chat";
import { SocketContext } from "../../../context/SocketContext";
import { getChatData } from "../../../api/supportChat";
import { UserRents } from "../UserRents/UserRents";

export function MyBooks() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { socket } = useContext(SocketContext);
  const user = useAppSelector(state => state.userReducer);
  const { closeActionModal, showActionModal } = useContext(ActionModalContext);
  const observedUserProfile = useAppSelector(state => state.observedUserProfileReducer);
  const navigation = useNavigate();
  const [userRents, setUserRents] = useState<BookRentalResponseDto[]>([]);
  const [rentType, setRentType] = useState("all");
  const [chatBtnVisibility, setChatBtnVisibility] = useState(false);
  const [chatAvailability, setChatAvailability] = useState(false);
  // const [userData, setUserData] = useState<User>();

  async function handleSubscribeToUserMessages() {
    if (params.id) {
      const chatData = await getChatData(+params.id);
      if (chatData) {
        setChatAvailability(true);
        dispatch(updateObservedUserChat(chatData));
        console.log(observedUserProfile)
        socket?.emit("subscribeToChat", { chatId: chatData.id });
      }
    }
  }

  async function handleSetUserRents() {
    const userRentsRequsetResult = await getClientOwnRents();
    setUserRents(userRentsRequsetResult);
  }

  useEffect(() => {
    // dispatch(resetObservedUserProfile());
    handleSetUserRents();
    handleSubscribeToUserMessages();
  }, []);

  return (
    <div className={styles.myBooks}>
      <header className={styles.header}>
        Мои книги
      </header>
      <UserRents userRents={userRents}/>
      <button 
        className={styles.chatBtn}
        type="button"
        disabled={!chatAvailability}
        onClick={() => {
          chatBtnVisibility
            ? closeActionModal!()
            : showActionModal!(<Chat chat={observedUserProfile.chat} />, "chat");
          setChatBtnVisibility(!chatBtnVisibility);
        }}
      >
        {
          chatBtnVisibility
            ? <X />
            : <MessageSquare />
        }
      </button>
    </div>
  );
}