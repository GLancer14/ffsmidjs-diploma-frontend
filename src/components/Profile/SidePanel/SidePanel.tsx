import styles from "./SidePanel.module.scss";
import avatar from "../../../assets/avatars/avatar 1.svg";
import { Link, useLocation } from "react-router";
import { House, LibraryBig, LogOut, Settings, UserRound, UsersRound } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHook";
import classNames from "classnames";
import { logout } from "../../../api/auth";
import { updateCurrentUser } from "../../../store/reducers/userSlice";
import { useEffect, useState } from "react";

export function SidePanel() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.usersReducer);

  const [currentPage, setCurrentPage] = useState("");

  function handleUserLogout() {
    dispatch(updateCurrentUser({
      name: "",
      email: "",
      contactPhone: "",
      role: "",
    }));
    logout();
  }

  let libraryDataLink;
  switch (user.role) {
    case "client":
      libraryDataLink = (<li className={classNames(styles.link, {
          [styles.active]: currentPage.includes("books")
        })}>
        <Link to="/profile/books">
          <LibraryBig className={styles.icon} /> <span>Мои книги</span>
        </Link>
      </li>)
      break;
    case "manager":
      libraryDataLink = (<li className={classNames(styles.link, {
          [styles.active]: currentPage.includes("books")
        })}>
        <Link to="/profile/books">
          <LibraryBig className={styles.icon} /> <span>Книги</span>
        </Link>
      </li>)
      break;
    case "admin":
      libraryDataLink = (<li className={classNames(styles.link, {
          [styles.active]: currentPage.includes("libraries")
        })}>
        <Link to="/profile/libraries">
          <LibraryBig className={styles.icon} /> <span>Библиотеки</span>
        </Link>
      </li>)
      break;
    default:
      libraryDataLink = null;
      break;
  }

  useEffect(() => {
    let pagePath = location.pathname.split("/")[2];
    if (pagePath) {
      setCurrentPage(pagePath);
    } else {
      setCurrentPage("");
    }

    console.log(currentPage);
  });

  return (
    <div className={styles.sidePanel}>
      <img className={styles.avatar} src={avatar} alt="аватар пользователя" />
      <div className={styles.greeting}>Привет, {user.name}</div>
      <ul className={styles.links}>
        <li className={classNames(styles.link, {
          [styles.active]: currentPage === ""
        })}>
          <Link to="/profile">
            <House className={classNames(styles.link, {
              [styles.active]: currentPage === ""
            })} /> <span>Главная</span>
          </Link>
        </li>
        {user.role !== "client" && 
          (<li className={classNames(styles.link, {
          [styles.active]: currentPage.includes("users")
        })}>
            <Link to="/profile/users">
              <UsersRound className={styles.icon} /> <span>Пользователи</span>
            </Link>
          </li>)
        }
        {libraryDataLink}
        <li className={classNames(styles.link, {
          [styles.active]: currentPage.includes("settings")
        })}>
          {user.role !== "client"
            ? (<Link to="/profile/settings">
                <Settings className={styles.icon} /> <span>Настройки</span>
              </Link>)
            : (<Link to="/profile/settings">
                <UserRound className={styles.icon} /> <span>Профиль</span>
              </Link>)
          }
        </li>
        <li className={classNames(styles.link, styles.logout)}>
          <Link to="/" onClick={handleUserLogout}>
            <LogOut className={styles.icon} /> <span>Главная</span>
          </Link>
        </li>
      </ul>
      <Link className={styles.logo} to="/">LOGO</Link>
    </div>
  );
}