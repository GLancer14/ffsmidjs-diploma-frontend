import { Link, NavLink } from "react-router";
import { HashLink } from "react-router-hash-link";
import styles from "./Header.module.scss";
import { AuthModal } from "../UI/Modal/AuthModal";
import { useState } from "react";
import { useAppSelector } from "../../hooks/reduxHook";

export function Header() {
  const [authModalVisibility, setAuthModalVisibility] = useState<boolean>(false);
  const [authModalType, setAuthModalType] = useState<string>("login");
  const userState = useAppSelector((state) => state.usersReducer);

  return (
    <>
      <header className={styles.header}>
        <AuthModal
          visibility={authModalVisibility}
          setVisibility={setAuthModalVisibility}
          type={authModalType}
          setAuthModalType={setAuthModalType}
        />
        <div className={styles.authWrp}>
          {userState.email !== ""
            ? (
              <button
                className={styles.authBtn}
                onClick={() => {
                  setAuthModalType("login");
                  setAuthModalVisibility(true);
                }}
              >
                Войти в ЛК
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
        <div className="">
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
    </>
  );
}