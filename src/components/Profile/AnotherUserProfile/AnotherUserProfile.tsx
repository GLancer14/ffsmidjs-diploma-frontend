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

export function AnotherUserProfile() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { socket } = useContext(SocketContext);
  const { closeActionModal, showActionModal } = useContext(ActionModalContext);
  const observedUserProfile = useAppSelector(state => state.observedUserProfileReducer);
  const navigation = useNavigate();
  const [userRents, setUserRents] = useState<BookRentalResponseDto[]>([]);
  const [rentType, setRentType] = useState("all");
  const [chatBtnVisibility, setChatBtnVisibility] = useState(false);
  // const [userData, setUserData] = useState<User>();

  const userRentsList = userRents.filter(rent => {
    if (rentType === "all") {
      return true;
    } else if (rentType !== rent.status) {
      return false;
    } else {
      return true;
    }
  }).map(rent => {
    return (
      <div className={styles.row} key={rent.id}>
        <div className={classNames(styles.id, styles.cell)}>{rent.id}</div>
        <div className={classNames(styles.book, styles.cell)}>
          <div className={styles.title}>{rent.book.title} /</div>
          <div className={styles.author}>{rent.book.author}</div>
        </div>
        <div className={classNames(styles.library, styles.cell)}>{rent.library.name}</div>
        <div className={classNames(styles.dateStart, styles.cell)}>{parseDateFromUTCToRu(rent.dateStart)}</div>
        <div className={classNames(styles.dateEnd, styles.cell)}>{parseDateFromUTCToRu(rent.dateEnd)}</div>
        <div className={classNames(styles.status, styles.cell)}>
          {
            rent.status === "reserved"
            ? <BookMarked size={24} />
            : <SquareCheck size={24} />
          }
        </div>
      </div>
    );
  });
  
  async function handleSubscribeToUserMessages() {
    if (params.id) {
      const chatData = await getChatData(+params.id);
      console.log(chatData)
      if (chatData) {
        dispatch(updateObservedUserChat(chatData));
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
      setUserRents(userRentsRequsetResult);
    }
  }

  useEffect(() => {
    dispatch(resetObservedUserProfile());
    handleSetUserRents();
    handleGetUserData();
    handleSubscribeToUserMessages();
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
        <div className={styles.btnsWrp}>
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
          </div>
        </div>
        <div className={styles.rents}>
          <header className={styles.rentsHeader}>Книги пользователя</header>
          <form className={styles.rentsStatusWrp}>
            <label className={styles.label}>
              <span className={styles.desc}>Все</span>
              <input
                className={styles.radio}
                type="radio"
                name="user-type"
                value="all"
                onChange={handleRentTypeChange}
              />
            </label>
            <label className={styles.label}>
              <BookMarked />
              <span className={styles.desc}>Забронирована</span>
              <input
                className={styles.radio}
                type="radio"
                name="user-type"
                value="reserved"
                onChange={handleRentTypeChange}
              />
            </label>
            <label className={styles.label}>
              <SquareCheck />
              <span className={styles.desc}>Возвращена</span>
              <input
                className={styles.radio}
                type="radio"
                name="user-type"
                value="complete"
                onChange={handleRentTypeChange}
              />
            </label>
          </form>
          <div className={styles.table}>
            <div className={styles.headerRow}>
              <div className={classNames(styles.id, styles.cell)}>ID</div>
              <div className={classNames(styles.book, styles.cell)}>Название книги / автор</div>
              <div className={classNames(styles.library, styles.cell)}>Библиотека</div>
              <div className={classNames(styles.dateStart, styles.cell)}>Дата выдачи</div>
              <div className={classNames(styles.dateEnd, styles.cell)}>Дата возврата</div>
              <div className={classNames(styles.status, styles.cell)}>Статус</div>
            </div>
            {
              userRentsList.length === 0
                ? (<div className={styles.noResults}>Записи отсутствуют</div>)
                : userRentsList
            }
          </div>
        </div>
        <button 
          className={styles.chatBtn}
          type="button"
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