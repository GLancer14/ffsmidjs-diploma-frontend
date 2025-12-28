import { Link, NavLink, useNavigate } from "react-router";
import { HashLink } from "react-router-hash-link";
import styles from "./Header.module.scss";
import { AuthModal } from "../UI/AuthModal/AuthModal";
import { useState } from "react";
import { useAppSelector } from "../../hooks/reduxHook";
import avatar from "../../assets/avatars/avatar 1.svg";

export function Header() {
  const navigation = useNavigate();
  const [authModalVisibility, setAuthModalVisibility] = useState<boolean>(false);
  const [authModalType, setAuthModalType] = useState<string>("login");
  const userState = useAppSelector((state) => state.userReducer);

  return (
    <header className={styles.header}>
      <AuthModal
        visibility={authModalVisibility}
        setVisibility={setAuthModalVisibility}
        type={authModalType}
        setAuthModalType={setAuthModalType}
      />
      <div className={styles.authWrp}>
        {userState?.email !== ""
          ? (
            <button
              className={styles.authBtn}
              onClick={() => {
                navigation("/profile");
              }}
            >
              <img className={styles.avatar} src={avatar} alt="аватар" />
              <span>Войти в ЛК</span>
            </button>
            )
          : (
            <>
              <button
                className={styles.authBtn}
                onClick={() => {
                  setAuthModalType("login");
                  setAuthModalVisibility(true);
                }}
              >
                Вход
              </button>
              <button
                className={styles.authBtn}
                onClick={() => {
                  setAuthModalType("register");
                  setAuthModalVisibility(true);
                }}
              >
                Регистрация
              </button>
            </>
          )
        }
      </div>
      <div className={styles.logo}>
        <Link to="/">LOGO</Link>
      </div>
      <nav>
        <ul className={styles.navMenu}>
          <li>
            <HashLink smooth to="/#libraries">Библиотеки</HashLink>
          </li>
          <li>
            <HashLink smooth to="/#about-us">О нас</HashLink>
          </li>
          <li>
            <HashLink smooth to="#footer">Контакты</HashLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}