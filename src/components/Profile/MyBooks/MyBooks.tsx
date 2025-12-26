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
  const observedUserProfile = useAppSelector(state => state.observedUserProfileReducer);
  const navigation = useNavigate();
  const [userRents, setUserRents] = useState<BookRentalResponseDto[]>([]);

  async function handleSetUserRents() {
    const userRentsRequsetResult = await getClientOwnRents();
    setUserRents(userRentsRequsetResult);
  }

  useEffect(() => {
    handleSetUserRents();
  }, []);

  return (
    <div className={styles.myBooks}>
      <header className={styles.header}>
        Мои книги
      </header>
      {
        userRents.length === 0
          ? (<div className={styles.category}>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  У вас нет активных броней — найдите книгу и забронируйте её!
                </div>
              </div>
              <div className={styles.actionWrp}>
                <button
                  className={styles.action}
                  onClick={() => navigation("/")}
                >
                  Найти книгу
                </button>
              </div>
            </div>)
          : (<UserRents userRents={userRents}/>)
      }
      
    </div>
  );
}