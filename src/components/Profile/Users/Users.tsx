import { useContext, useEffect, useRef, useState, type ChangeEvent } from "react";
import styles from "./Users.module.scss";
import { findUsers } from "../../../api/users";
import { AddUser } from "../Actions/AddUser/AddUser";
import { ActionModalContext } from "../../../context/ActionModalContext";
import { BookOpen, ChevronsLeft, ChevronsRight, ContactRound, MessageSquare, UserRound } from "lucide-react";
import Pagination from "@mui/material/Pagination";
import type { User } from "../../../types/users";
import classNames from "classnames";

export function Users() {
  const { showActionModal } = useContext(ActionModalContext);
  const [userType, setUserType] = useState("");
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [findedUsers, setFindedUsers] = useState<User[]>([])

  async function handleSearchUsers() {
    const limit = 10;
    const users = await findUsers({
      limit: limit,
      offset: limit * (page - 1),
      searchString,
    });

    setFindedUsers(users);
  }

  function handlePageChange(e: React.ChangeEvent<unknown>, page: number) {
    setPage(page)
  }

  function handleUserTypeChange(e: ChangeEvent<HTMLInputElement>) {
    setUserType(e.currentTarget.value);
  }

  useEffect(() => {
    handleSearchUsers();
    console.log(findedUsers)
  }, [searchString, page]);

  return (
    <div className={styles.users}>
      <header className={styles.header}>
        <span>Пользователи</span>
        <button
          className={styles.addUserBtn}
          onClick={() => {
            showActionModal!(<AddUser />);
          }}
        >
          Добавить пользователя
        </button>
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
        
        {findedUsers.map(user => {
          return (
            <div className={styles.row}>
              <div className={classNames(styles.id, styles.cell)}>{user.id}</div>
              <div className={classNames(styles.contacts, styles.cell)}>
                <div>{user.name}</div>
                <div>{user.contactPhone}</div>
                <div className={styles.email}>{user.email}</div>
              </div>
              <div className={classNames(styles.activity, styles.cell)}>{user.id}</div>
              <div className={classNames(styles.rents, styles.cell)}>{user.id}</div>
              <div className={classNames(styles.role, styles.cell)}>{user.role}</div>
              <div className={classNames(styles.chat, styles.cell)}>
                <MessageSquare />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.pagination}>
        <button className={styles.navBtn} onClick={() => {
          setPage(prev => prev - 1);
        }}>
          <ChevronsLeft />
        </button>
        <Pagination
          count={10}
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
              // backgroundColor: "rgb(106, 163, 120)",
              borderRadius: "50%",
              // boxShadow: "rgb(0, 0, 0) 4px 4px",
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
          setPage(prev => prev + 1);
        }}>
          <ChevronsRight />
        </button>
      </div>
    </div>
  );
}