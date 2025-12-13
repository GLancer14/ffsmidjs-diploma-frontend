import { Link } from "react-router";
import styles from "./Header.module.scss";

export function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.authWrp}>
          <button className={styles.loginBtn}>Вход</button>
        </div>
        <div className="">
          <Link to="/">
            <span>LOGO</span>
          </Link>
        </div>
        <nav>
          <ul className={styles.navMenu}>
            <li>
              <Link to="#">Библиотеки</Link>
            </li>
            <li>
              <Link to="#">О нас</Link>
            </li>
            <li>
              <Link to="#">Контакты</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}