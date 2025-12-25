import { useContext, useEffect, useState, type ChangeEvent } from "react";
import styles from "./UserRents.module.scss";
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



export function UserRents({
  userRents
}: {userRents: BookRentalResponseDto[]}) {
  // const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userReducer);
  // const observedUserProfile = useAppSelector(state => state.observedUserProfileReducer);
  // const [userRents, setUserRents] = useState<BookRentalResponseDto[]>([]);
  const [rentType, setRentType] = useState("all");
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
        {
          user.role === "client" &&
            <div className={classNames(styles.cover, styles.cell)}>
              {
                rent.book.coverImage &&
                (<img
                  className={styles.coverImage}
                  src={`${import.meta.env.VITE_SERVER_URL}/public/images/${rent.book.coverImage}`}
                  alt="обложка"
                />)
              }
            </div>
        }
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

  function handleRentTypeChange(e: ChangeEvent<HTMLInputElement>) {
    setRentType(e.currentTarget.value);
  }

  return (
    <div className={styles.rents}>
      <header className={styles.rentsHeader}>
        {user.role !== "client" && "Книги пользователя"}
      </header>
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
      <div className={classNames(styles.table, {
        [styles.ownClientRentsTable]: user.role === "client"
      })}>
        <div className={styles.headerRow}>
          <div className={classNames(styles.id, styles.cell)}>ID</div>
          {
            user.role === "client" &&
              (<div className={classNames(styles.cover, styles.cell)}>Обложка</div>)
          }
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
  );
}