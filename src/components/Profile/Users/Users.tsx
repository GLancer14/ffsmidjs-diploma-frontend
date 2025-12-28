import { useContext, useEffect, useState, type ChangeEvent } from "react";
import styles from "./Users.module.scss";
import { findUsers, getUsersCount } from "../../../api/users";
import { AddUser } from "../Actions/AddUser/AddUser";
import { ActionModalContext } from "../../../context/ActionModalContext";
import { BookOpen, ChevronsLeft, ChevronsRight, ContactRound, MessageSquare, UserRound } from "lucide-react";
import Pagination from "@mui/material/Pagination";
import type { User } from "../../../types/users";
import classNames from "classnames";
import { Link } from "react-router";
import { useAppSelector } from "../../../hooks/reduxHook";
import { findUserBookRents } from "../../../api/bookRent";
import { type BookRentalResponseDto } from "../../../types/bookRent";

export function Users() {
  const user = useAppSelector(state => state.userReducer);
  const [usersRents, setUserRents] = useState<BookRentalResponseDto[][]>([]);
  const [foundUsers, setFoundUserRents] = useState<User[]>([]);
  const { showActionModal } = useContext(ActionModalContext);
  const [userType, setUserType] = useState("");
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const limit = 10;

  async function handleSearchUsers() {
    const users: User[] = await findUsers({
      limit: limit,
      offset: limit * (page - 1),
      searchString,
    });

    const usersRents: Array<BookRentalResponseDto[]> = await Promise.all(users.map(async (user) => {
      return await findUserBookRents(user.id);
    }));

    setUserRents(usersRents);
    setFoundUserRents(users);
  }

  async function handleGetPagesCount() {
    const usersCount = await getUsersCount({searchString});

    setPagesCount(Math.ceil(usersCount / limit));
  }

  function handlePageChange(e: React.ChangeEvent<unknown>, page: number) {
    setPage(page);
  }

  function handleUserTypeChange(e: ChangeEvent<HTMLInputElement>) {
    setUserType(e.currentTarget.value);
  }

  useEffect(() => {
    console.log(pagesCount)
    handleGetPagesCount();
  }, [searchString]);

  useEffect(() => {
    handleSearchUsers();
  }, [searchString, page]);

  return (
    <div className={styles.users}>
      <header className={styles.header}>
        <span>Пользователи</span>
        {
          user.role === "admin" &&
            (<button
              className={styles.addUserBtn}
              onClick={() => {
                showActionModal!(<AddUser />);
              }}
            >
              Добавить пользователя
            </button>)
        }
      </header>
      <form className={styles.form}>
        <input
          className={styles.search}
          type="text"
          value={searchString}
          onInput={(e) => {
            setSearchString(e.currentTarget.value);
          }}
          placeholder="Введите имя пользователя, телефон или почту"
        />
        <div className={styles.usersTypesWrp}>
          <label className={styles.label}>
            <span className={styles.desc}>Все</span>
            <input
              className={styles.radio}
              type="radio"
              name="user-type"
              value="all"
              onChange={handleUserTypeChange}
            />
          </label>
          <label className={styles.label}>
            <ContactRound />
            <span className={styles.desc}>Администратор</span>
            <input
              className={styles.radio}
              type="radio"
              name="user-type"
              value="admin"
              onChange={handleUserTypeChange}
            />
          </label>
          <label className={styles.label}>
            <BookOpen />
            <span className={styles.desc}>Библиотекарь</span>
            <input
              className={styles.radio}
              type="radio"
              name="user-type"
              value="manager"
              onChange={handleUserTypeChange}
            />
          </label>
          <label className={styles.label}>
            <UserRound />
            <span className={styles.desc}>Клиент</span>
            <input
              className={styles.radio}
              type="radio"
              name="user-type"
              value="client"
              onChange={handleUserTypeChange}
            />
          </label>
        </div>
      </form>
      <div className={styles.searchResults}>
        <div className={styles.headerRow}>
          <div className={classNames(styles.id, styles.cell)}>ID</div>
          <div className={classNames(styles.contacts, styles.cell)}>ФИО / Контакты</div>
          <div className={classNames(styles.activity, styles.cell)}>Последняя активность</div>
          <div className={classNames(styles.rents, styles.cell)}>Активные брони</div>
          <div className={classNames(styles.role, styles.cell)}>Роль</div>
          <div className={classNames(styles.chat, styles.cell)}>Чат</div>
        </div>
        {
          foundUsers.length === 0
            ? (<div className={styles.noResults}>Результаты не найдены</div>)
            : (foundUsers.map(user => {
              let activeRentsCount = 0;
              const activeRents = usersRents.find(rents => {
                return rents.length > 0 && rents[0].userId === user.id;
              });

              if (activeRents) {
                activeRentsCount = activeRents.filter(rent => rent.status === "active").length;
              }

              return (
                <Link className={styles.row} to={`/profile/users/${user.id}`} key={user.id}>
                  <div className={classNames(styles.id, styles.cell)}>{user.id}</div>
                  <div className={classNames(styles.contacts, styles.cell)}>
                    <div className={styles.name}>{user.name}</div>
                    <div className={styles.contactPhone}>{user.contactPhone}</div>
                    <div className={styles.email}>{user.email}</div>
                  </div>
                  <div className={classNames(styles.activity, styles.cell)}>{user.id}</div>
                  <div className={classNames(styles.rents, styles.cell)}>
                    {
                    user.role !== "client"
                      ? "-"
                      : activeRentsCount
                    }
                  </div>
                  <div
                    className={classNames(styles.role, styles.cell)}
                  >
                    {
                      user.role === "admin"
                      ? <ContactRound size={24} />
                      : user.role === "manager" 
                        ? <BookOpen size={24} />
                        : <UserRound size={24} />
                    }
                  </div>
                  <div className={classNames(styles.chat, styles.cell)}>
                    <MessageSquare />
                  </div>
                </Link>
              );
            }))
        }
      </div>
      <div className={styles.pagination}>
        <button className={styles.navBtn} onClick={() => {
          if (page > 1) {
            setPage(prev => prev - 1);
          }
        }}>
          <ChevronsLeft />
        </button>
        <Pagination
          count={pagesCount}
          page={page}
          onChange={handlePageChange}
          hideNextButton
          hidePrevButton
          defaultPage={1}
          siblingCount={0}
          boundaryCount={1}
          sx={{
            "& .Mui-selected": {
              backgroundColor: "rgb(255, 195, 62)",
              border: "1px solid rgb(0, 0, 0)",
            },
            "& .Mui-selected:hover": {
              backgroundColor: "rgb(255, 195, 62)",
              border: "1px solid rgb(0, 0, 0)",
            },
            "& .MuiPaginationItem-root": {
              width: "36px",
              height: "36px",
              margin: "0 -2px",
              font: "inherit",
            },
            "& .MuiPaginationItem-icon": {
              width: "36px",
              height: "36px",
            },
            "& .MuiPaginationItem-icon:hover": {
              boxShadow: "none",
            },
             "& .MuiPaginationItem-ellipsis": {
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              verticalAlign: "bottom"
            },
          }}
        />
        <button className={styles.navBtn} onClick={() => {
          if (page < pagesCount) {
            setPage(prev => prev + 1);
          }
        }}>
          <ChevronsRight />
        </button>
      </div>
    </div>
  );
}