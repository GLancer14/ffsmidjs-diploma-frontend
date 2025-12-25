import { useContext, useEffect, useState, type ChangeEvent } from "react";
import styles from "./AnotherUserProfile.module.scss";
import { getUserById } from "../../../api/users";
import { ActionModalContext } from "../../../context/ActionModalContext";
import { ArrowBigLeft, BookMarked, MessageSquare, SquareCheck, X } from "lucide-react";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { findUserBookRents } from "../../../api/bookRent";
import { type BookRentalResponseDto } from "../../../store/reducers/usersRentsSlice";
import { parseDateFromUTCToRu } from "../../../utils/parseRuDate";
import { EditProfile } from "../Actions/EditProfile/EditProfile";
import { resetObservedUserProfile, updateObservedUserChat, updateObservedUserProfile } from "../../../store/reducers/observedUserProfileSlice";
import { DeleteUser } from "../Actions/DeleteUser/DeleteUser";
import { Chat } from "../Chat/Chat";
import { SocketContext } from "../../../context/SocketContext";
import { getChatData } from "../../../api/supportChat";
import { UserRents } from "../UserRents/UserRents";

export function AnotherUserProfile() {
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
  // const [userData, setUserData] = useState<User>();
  
  async function handleSubscribeToChatMessages() {
    if (params.id) {
      const chatData = await getChatData(+params.id);
      if (chatData) {
        dispatch(updateObservedUserChat(chatData));
        console.log(observedUserProfile)
        socket?.emit("subscribeToChat", { chatId: chatData.id });
      }
    }
  }

  async function handleGetUserData() {
    if (params.id) {
      const user = await getUserById(params.id);

      dispatch(updateObservedUserProfile({
        id: user.id,
        name: user.name,
        email: user.email,
        contactPhone: user.contactPhone,
        role: user.role,
      }))
      // setUserData(user);
    }
  }

  async function handleSetUserRents() {
    if (params.id) {
      const userRentsRequsetResult = await findUserBookRents(+params.id);

      console.log(userRentsRequsetResult)
      setUserRents(userRentsRequsetResult);
    }
  }

  useEffect(() => {
    dispatch(resetObservedUserProfile());
    handleSetUserRents();
    handleGetUserData();
    handleSubscribeToChatMessages();
  }, []);

  function handleRentTypeChange(e: ChangeEvent<HTMLInputElement>) {
    setRentType(e.currentTarget.value);
  }

  return (
    <div className={styles.profile}>
      <header className={styles.header}>
        <span>{observedUserProfile.name}</span>
        <button
          className={styles.back}
          onClick={() => {
            navigation("/profile/users");
          }}
        >
          <ArrowBigLeft />
          Назад
        </button>
      </header>
      <div className={styles.card}>
        <header className={styles.cardHeader}>Личная информация</header>
        <div className={styles.dataWrp}>
          <div className={styles.desc}>Имя:</div>
          <div className={styles.content}>{observedUserProfile.name}</div>
          <div className={styles.desc}>Телефон:</div>
          <div className={styles.content}>{observedUserProfile.contactPhone}</div>
          <div className={styles.desc}>Почта:</div>
          <div className={styles.content}>{observedUserProfile.email}</div>
          <div className={styles.desc}>Роль:</div>
          <div className={styles.content}>{observedUserProfile.role}</div>
        </div>
        {
          user.role === "admin" &&
          (<div className={styles.btnsWrp}>
            <button
              className={classNames(styles.btn, styles.edit)}
              type="button"
              onClick={() => {
                showActionModal!(
                  <EditProfile />
                );
              }}
            >
              Редактировать
            </button>
            <button
              className={classNames(styles.btn, styles.delete)}
              type="button"
              onClick={() => {
                showActionModal!(
                  <DeleteUser />
                );
              }}
            >
              Удалить пользователя
            </button>
          </div>)
        }
      </div>
      <UserRents userRents={userRents}/>
      <button 
        className={styles.chatBtn}
        type="button"
        onClick={() => {
          chatBtnVisibility
            ? closeActionModal!()
            : showActionModal!(<Chat />, "chat");
            // : showActionModal!(<Chat chat={observedUserProfile.chat} />, "chat");
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