import styles from "./SidePanel.module.scss";
import avatar from "../../../assets/avatars/avatar 1.svg";
import { Link } from "react-router";
import { House, LibraryBig, LogOut, Settings, UserRound, UsersRound } from "lucide-react";
import { useAppSelector } from "../../../hooks/reduxHook";
import classNames from "classnames";

export function SidePanel() {
  const user = useAppSelector(state => state.usersReducer);

  let libraryDataLink;
  switch (user.role) {
    case "client":
      libraryDataLink = (<li className={styles.link}>
        <Link to="/profile/books">
          <LibraryBig className={styles.icon} /> <span>Мои книги</span>
        </Link>
      </li>)
      break;
    case "manager":
      libraryDataLink = (<li className={styles.link}>
        <Link to="/profile/books">
          <LibraryBig className={styles.icon} /> <span>Книги</span>
        </Link>
      </li>)
      break;
    case "admin":
      libraryDataLink = (<li className={styles.link}>
        <Link to="/profile/libraries">
          <LibraryBig className={styles.icon} /> <span>Библиотеки</span>
        </Link>
      </li>)
      break;
    default:
      libraryDataLink = null;
      break;
  }

  return (
    <div className={styles.sidePanel}>
      <img className={styles.avatar} src={avatar} alt="аватар пользователя" />
      <div className={styles.greeting}>Привет, {user.name}</div>
      <ul className={styles.links}>
        <li className={styles.link}>
          <Link to="/profile">
            <House className={styles.icon} /> <span>Главная</span>
          </Link>
        </li>
        {user.role !== "client" && 
          (<li className={styles.link}>
            <Link to="/profile/users">
              <UsersRound className={styles.icon} /> <span>Пользователи</span>
            </Link>
          </li>)
        }
        {libraryDataLink}
        <li className={styles.link}>
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
          <Link to="/">
            <LogOut className={styles.icon} /> <span>Главная</span>
          </Link>
        </li>
      </ul>
      <Link className={styles.logo} to="/">LOGO</Link>
    </div>
  );
}