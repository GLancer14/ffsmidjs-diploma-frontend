import {
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./AnotherUserProfile.module.scss";
import { getUserById } from "../../../api/users";
import { ActionModalContext } from "../../../context/ActionModalContext";
import { ArrowBigLeft } from "lucide-react";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { findUserBookRents } from "../../../api/bookRent";
import { type BookRentalResponseDto } from "../../../types/bookRent";
import { EditProfile } from "../Actions/EditProfile/EditProfile";
import {
  resetObservedUserProfile,
  updateObservedUserChat,
  updateObservedUserProfile,
} from "../../../store/reducers/observedUserProfileSlice";
import { DeleteUser } from "../Actions/DeleteUser/DeleteUser";
import { SocketContext } from "../../../context/SocketContext";
import { getChatData } from "../../../api/supportChat";
import { UserRents } from "../UserRents/UserRents";
import { ChatButton } from "../Actions/ChatButton/ChatButton";
import { AlertContext } from "../../../context/AlertContext";

export function AnotherUserProfile() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { showAlert } = useContext(AlertContext);
  const { socket } = useContext(SocketContext);
  const user = useAppSelector(state => state.userReducer);
  const { showActionModal } = useContext(ActionModalContext);
  const observedUserProfile = useAppSelector(state => state.observedUserProfileReducer);
  const navigation = useNavigate();
  const [userRents, setUserRents] = useState<BookRentalResponseDto[]>([]);
  const [chatId, setChatId] = useState(0);
  
  async function handleSubscribeToChatMessages() {
    if (params.id && user.id) {
      const chatData = await getChatData(+params.id);
      if (chatData?.status === "fail") {
        showAlert!(chatData.data);
        return;
      }

      dispatch(updateObservedUserChat(chatData));
      socket?.emit("subscribeToChat", { chatId: chatData.id });
      setChatId(chatData.id);
    }
  }

  async function handleGetUserData() {
    if (params.id) {
      const user = await getUserById(params.id);

      if (user?.status === "fail") {
        showAlert!(user.data);
        return;
      }

      dispatch(updateObservedUserProfile({
        id: user.id,
        name: user.name,
        email: user.email,
        contactPhone: user.contactPhone,
        role: user.role,
      }));
      // setUserData(user);
    }
  }

  async function handleSetUserRents() {
    if (params.id) {
      const userRentsRequsetResult = await findUserBookRents(+params.id);
      if (userRentsRequsetResult?.status === "fail") {
        showAlert!(userRentsRequsetResult.data);
        return;
      }
      
      setUserRents(userRentsRequsetResult);
    }
  }

  useEffect(() => {
    dispatch(resetObservedUserProfile());
    handleSetUserRents();
    handleGetUserData();
    handleSubscribeToChatMessages();

    return () => {
      socket?.emit("unsubscribeToChat", { chatId: chatId });
    }
  }, []);

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
      <ChatButton />
    </div>
  );
}