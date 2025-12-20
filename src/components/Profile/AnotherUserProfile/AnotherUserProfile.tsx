import { useContext, useEffect, useRef, useState, type ChangeEvent } from "react";
import styles from "./AnotherUserProfile.module.scss";
import { findUsers, getUsersCount } from "../../../api/users";
import { AddUser } from "../Actions/AddUser/AddUser";
import { ActionModalContext } from "../../../context/ActionModalContext";
import { ArrowBigLeft, BookMarked, BookOpen, ChevronsLeft, ChevronsRight, ContactRound, MessageSquare, SquareCheck, UserRound } from "lucide-react";
import Pagination from "@mui/material/Pagination";
import type { User } from "../../../types/users";
import classNames from "classnames";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import { findUserBookRents } from "../../../api/bookRent";
import { updateUsersRents, type BookRentalResponseDto } from "../../../store/reducers/usersRentsSlice";
import { parseDateFromUTCToRu } from "../../../utils/parseRuDate";

export function AnotherUserProfile() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { showActionModal } = useContext(ActionModalContext);
  const foundUsers = useAppSelector(state => state.foundUsersReducer);
  const navigation = useNavigate();
  const [userRents, setUserRents] = useState<BookRentalResponseDto[]>([]);
  const [rentType, setRentType] = useState("all")

  const userData = foundUsers.find(user => {
    if (params.id) {
      return user.id === +params.id
    }
  });

  async function handleSetUserRents() {
    if (params.id) {
      const userRentsRequsetResult = await findUserBookRents(+params.id);
      setUserRents(userRentsRequsetResult);
    }
  }

  useEffect(() => {
    handleSetUserRents();
  }, []);
  // const usersRents = useAppSelector(state => state.usersRentsReducer);
  // const { showActionModal } = useContext(ActionModalContext);
  // const [userType, setUserType] = useState("");
  // const [searchString, setSearchString] = useState("");
  // const [page, setPage] = useState(1);
  // const [pagesCount, setPagesCount] = useState(1);
  // const [findedUsers, setFindedUsers] = useState<User[]>([]);
  // const limit = 10;

  // async function handleSearchUsers() {
  //   const users: User[] = await findUsers({
  //     limit: limit,
  //     offset: limit * (page - 1),
  //     searchString,
  //   });

  //   const usersRents: Array<BookRentalResponseDto[]> = await Promise.all(users.map(async (user) => {
  //     return await findUserBookRents(user.id);
  //   }));

  //   dispatch(updateUsersRents(usersRents))
  //   setFindedUsers(users);
  // }

  // async function handleGetUserPersonalData() {
  //   const usersCount = await getUsersCount({searchString});

  //   setPagesCount(Math.ceil(usersCount / limit));
  // }

  // function handlePageChange(e: React.ChangeEvent<unknown>, page: number) {
  //   setPage(page);
  // }

  function handleRentTypeChange(e: ChangeEvent<HTMLInputElement>) {
    setRentType(e.currentTarget.value);
  }

  // useEffect(() => {
  //   console.log(pagesCount)
  //   handleGetPagesCount();
  // }, [searchString]);

  // useEffect(() => {
  //   handleSearchUsers();
  // }, [searchString, page]);

  return (
    <div className={styles.profile}>
      <header className={styles.header}>
        <span>Имя пользователя</span>
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
          <div className={styles.content}>{userData?.name}</div>
          <div className={styles.desc}>Телефон:</div>
          <div className={styles.content}>{userData?.contactPhone}</div>
          <div className={styles.desc}>Почта:</div>
          <div className={styles.content}>{userData?.email}</div>
          <div className={styles.desc}>Роль:</div>
          <div className={styles.content}>{userData?.role}</div>
        </div>
        <div className={styles.btnsWrp}>
            <button
              className={classNames(styles.btn, styles.edit)}
              type="button"
              // onClick={() => closeActionModal!()}
            >
              Редактировать
            </button>
            <button
              className={classNames(styles.btn, styles.delete)}
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
              userRents.length === 0
                ? (<div className={styles.noResults}>Записи отсутствуют</div>)
                : (userRents.filter(rent => {
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
                  })
                )
            }
          </div>
        </div>
      </div>
      
    
 
    //   <div className={styles.searchResults}>
    //     <div className={styles.headerRow}>
    //       <div className={classNames(styles.id, styles.cell)}>ID</div>
    //       <div className={classNames(styles.contacts, styles.cell)}>ФИО / Контакты</div>
    //       <div className={classNames(styles.activity, styles.cell)}>Последняя активность</div>
    //       <div className={classNames(styles.rents, styles.cell)}>Активные брони</div>
    //       <div className={classNames(styles.role, styles.cell)}>Роль</div>
    //       <div className={classNames(styles.chat, styles.cell)}>Чат</div>
    //     </div>
    //     {
    //       findedUsers.length === 0
    //         ? (<div className={styles.noResults}>Результаты не найдены</div>)
    //         : (findedUsers.map(user => {
    //           let activeRentsCount = 0;
    //           const activeRents = usersRents.find(rents => {
    //             return rents.length > 0 && rents[0].userId === user.id;
    //           });

    //           if (activeRents) {
    //             activeRentsCount = activeRents.filter(rent => rent.status === "active").length;
    //           }

    //           return (
    //             <Link className={styles.row} to={`/users/${user.id}`} key={user.id}>
    //               <div className={classNames(styles.id, styles.cell)}>{user.id}</div>
    //               <div className={classNames(styles.contacts, styles.cell)}>
    //                 <div className={styles.name}>{user.name}</div>
    //                 <div className={styles.contactPhone}>{user.contactPhone}</div>
    //                 <div className={styles.email}>{user.email}</div>
    //               </div>
    //               <div className={classNames(styles.activity, styles.cell)}>{user.id}</div>
    //               <div className={classNames(styles.rents, styles.cell)}>
    //                 {
    //                 user.role !== "client"
    //                   ? "-"
    //                   : activeRentsCount
    //                 }
    //               </div>
    //               <div
    //                 className={classNames(styles.role, styles.cell)}
    //               >
    //                 {
    //                   user.role === "admin"
    //                   ? <ContactRound size={24} />
    //                   : user.role === "manager" 
    //                     ? <BookOpen size={24} />
    //                     : <UserRound size={24} />
    //                 }
    //               </div>
    //               <div className={classNames(styles.chat, styles.cell)}>
    //                 <MessageSquare />
    //               </div>
    //             </Link>
    //           );
    //         }))
    //     }
    //   </div>
  );
}